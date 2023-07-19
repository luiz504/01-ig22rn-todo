import { act, renderHook, waitFor } from '@testing-library/react-native'
import { Task, useHomeController } from './controller'

describe('useHomeController Hook', () => {
  it('should add a new task on form submission', async () => {
    const { result } = renderHook(() => useHomeController())

    const oldTasksLength = result.current.tasks.length

    const newTaskDescription = 'New Task 1'

    await act(async () => {
      result.current.setValue?.('description', newTaskDescription)
      result.current.onSubmit()
    })

    await waitFor(() => result.current.tasks.length === oldTasksLength + 1)

    expect(result.current.tasks.length).toBe(oldTasksLength + 1)
    expect(result.current.tasks[0].description).toBe(newTaskDescription)
    expect(result.current.tasks[0].done).toBe(false)
  })

  it('should delete an task correctly', async () => {
    const { result } = renderHook(() => useHomeController())

    const initialTasks: Task[] = [
      { id: 'task1', description: 'Task 1', done: false },
    ]

    act(() => {
      result.current.setTasks?.(initialTasks)
      expect(result.current.tasks).toHaveLength(1)
    })

    await waitFor(() => result.current.tasks[0].id === initialTasks[0].id)

    act(() => {
      result.current.handleDeleteTask(initialTasks[0].id)
    })

    await waitFor(() => {
      expect(result.current.tasks).toHaveLength(0)
    })
  })

  it('should check and unckeck a task correctly', async () => {
    const { result } = renderHook(() => useHomeController())

    const initalTasks: Task[] = [
      {
        id: 'task1',
        description: 'Task 1',
        done: false,
      },
      {
        id: 'task2',
        description: 'Task 1',
        done: false,
      },
    ]

    await act(async () => {
      result.current.setTasks?.(initalTasks)
    })

    await waitFor(() => result.current.tasks[0].id === initalTasks[0].id)

    expect(result.current.tasks[0].id).toBe(initalTasks[0].id)
    expect(result.current.tasks[0].done).toBe(initalTasks[0].done)
    // Initial Setup

    act(() => {
      result.current.handleCheckTask(initalTasks[0].id, true)
    })

    expect(result.current.tasks[0].done).toBe(true)

    act(() => {
      result.current.handleCheckTask(initalTasks[0].id, false)
    })

    expect(result.current.tasks[0].done).toBe(false)
    expect(result.current.tasks).toEqual(initalTasks)

    act(() => {
      result.current.handleCheckTask('undefined Id', false)
    })
    expect(result.current.tasks).toEqual(initalTasks)
  })
})
