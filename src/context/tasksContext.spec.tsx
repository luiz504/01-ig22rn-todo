/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as useTasksQueries from '@/hooks/useTasksQueries'
import type { Task } from '@/hooks/useTasksQueries'
import { act, renderHook } from '@testing-library/react-native'

import {
  TasksContext,
  TasksContextProvider,
  useTasksContext,
} from './tasksContext'

describe('Tasks Context', () => {
  const tasksInitial: Task[] = [
    { id: 't1', description: 'T1 description', done: false },
    { id: 't2', description: 'T2 description', done: true },
  ]

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <TasksContextProvider>{children}</TasksContextProvider>
  )

  const useTasksQueriesSpyReturn = (
    tasksQuery?: ReturnType<
      (typeof useTasksQueries)['useTasksQueries']
    >['tasksQuery'],
  ) => {
    const addTaskMutation = { mutateAsync: jest.fn() }
    const deleteTaskMutation = { mutateAsync: jest.fn() }
    const updateTaskStatusMutation = { mutateAsync: jest.fn() }

    const useTaskQueries = jest
      .spyOn(useTasksQueries, 'useTasksQueries')
      .mockReturnValueOnce({
        // @ts-ignore
        addTaskMutation,
        // @ts-ignore
        deleteTaskMutation,
        // @ts-ignore
        updateTaskStatusMutation,
        // @ts-ignore
        tasksQuery: { data: [], isLoading: false, ...tasksQuery },
      })

    return {
      addTaskMutation,
      deleteTaskMutation,
      updateTaskStatusMutation,
      useTaskQueries,
    }
  }

  beforeEach(() => {
    jest.restoreAllMocks()
  })

  it('should provide the tasks list, tasks created count, tasks done count', () => {
    useTasksQueriesSpyReturn({ data: tasksInitial } as any)
    const { result } = renderHook(() => useTasksContext(), { wrapper: Wrapper })

    expect(result.current.tasksCreated).toBe(2)
    expect(result.current.tasksDone).toBe(1)
    expect(result.current.tasks).toEqual(tasksInitial)
  })

  describe('handleCreateTask', () => {
    it('should call addTaskMutation with the correct arguments', async () => {
      const { addTaskMutation } = useTasksQueriesSpyReturn({
        data: tasksInitial,
      } as any)
      const { result } = renderHook(() => useTasksContext(), {
        wrapper: Wrapper,
      })
      const newTaskDescription = 'New Fake Task Description'

      await act(async () => {
        await result.current.handleCreateTask({
          description: newTaskDescription,
        })
      })

      expect(addTaskMutation.mutateAsync).toHaveBeenCalledTimes(1)
      expect(addTaskMutation.mutateAsync).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            description: newTaskDescription,
            done: false,
          }),
          ...tasksInitial,
        ]),
      )
    })
  })

  describe('handleDeleteTask', () => {
    it('should call deleteTaskMutation with the correct arguments', async () => {
      const { deleteTaskMutation } = useTasksQueriesSpyReturn({
        data: tasksInitial,
      } as any)
      const { result } = renderHook(() => useTasksContext(), {
        wrapper: Wrapper,
      })

      const deletedTaskId = tasksInitial[1].id

      await act(async () => {
        await result.current.handleDeleteTask(deletedTaskId)
      })

      expect(deleteTaskMutation.mutateAsync).toHaveBeenCalledTimes(1)
      expect(deleteTaskMutation.mutateAsync).toHaveBeenCalledWith(
        tasksInitial.filter((t) => t.id !== deletedTaskId),
      )
    })
  })

  describe('handleUpdateTaskStatus', () => {
    it('should call updateTaskStatusMutation with the correct arguments', async () => {
      const { updateTaskStatusMutation } = useTasksQueriesSpyReturn({
        data: tasksInitial,
      } as any)
      const { result } = renderHook(() => useTasksContext(), {
        wrapper: Wrapper,
      })
      const targetTask = tasksInitial[1]

      await act(async () => {
        await result.current.handleUpdateTaskStatus(
          targetTask.id,
          !targetTask.done,
        )
      })

      const expectedMutationArguments = tasksInitial.map((task) =>
        task.id === targetTask.id ? { ...task, done: !targetTask.done } : task,
      )

      expect(updateTaskStatusMutation.mutateAsync).toHaveBeenCalledTimes(1)
      expect(updateTaskStatusMutation.mutateAsync).toHaveBeenCalledWith(
        expectedMutationArguments,
      )
    })

    it('should not call updateTaskStatusMutation when tasks id does not exist', async () => {
      const { updateTaskStatusMutation } = useTasksQueriesSpyReturn({
        data: tasksInitial,
      } as any)
      const { result } = renderHook(() => useTasksContext(), {
        wrapper: Wrapper,
      })

      await act(async () => {
        await result.current.handleUpdateTaskStatus('inexistentID', true)
      })

      expect(updateTaskStatusMutation.mutateAsync).not.toHaveBeenCalled()
    })

    it('should not call updateTaskStatusMutation when tasks status has not changed', async () => {
      const { updateTaskStatusMutation } = useTasksQueriesSpyReturn({
        data: tasksInitial,
      } as any)
      const { result } = renderHook(() => useTasksContext(), {
        wrapper: Wrapper,
      })

      const taskTarget = tasksInitial[1]

      await act(async () => {
        await result.current.handleUpdateTaskStatus(
          taskTarget.id,
          taskTarget.done,
        )
      })

      expect(updateTaskStatusMutation.mutateAsync).not.toHaveBeenCalled()
    })
  })

  describe('useTasksContext Hook', () => {
    it('should return the correct context when used within TasksContextProvider', () => {
      const tasksContextValue = {
        tasks: [],
        tasksCreated: 0,
        tasksDone: 0,
        isLoading: false,
        isUpdating: false,
        handleCreateTask: jest.fn(),
        isCreating: false,
        handleDeleteTask: jest.fn(),
        isDeleting: false,
        handleUpdateTaskStatus: jest.fn(),
      }

      // Render the hook with the TasksContextProvider and provide the context value
      const { result } = renderHook(() => useTasksContext(), {
        wrapper: ({ children }) => (
          <TasksContext.Provider value={tasksContextValue}>
            {children}
          </TasksContext.Provider>
        ),
      })

      // The hook should return the provided context value
      expect(result.current).toEqual(tasksContextValue)
    })
    it('should trigger error when not wrapped by its context', () => {
      // eslint-disable-next-line no-console
      const originalError = console.error
      // eslint-disable-next-line no-console
      console.error = jest.fn()

      try {
        renderHook(() => useTasksContext())
      } catch (err) {
        expect((err as Error).message.length).toBeGreaterThan(0)
      }

      // Restore the original console.error function
      // eslint-disable-next-line no-console
      console.error = originalError
    })
  })
})
