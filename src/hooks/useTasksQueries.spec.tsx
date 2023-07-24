import { act, renderHook, waitFor } from '@testing-library/react-native'
import {
  Task,
  useTasksQueries,
  QUERY_KEY,
  STORAGE_KEY,
} from './useTasksQueries'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientTest } from '__mocks__/queryClient'
import { Alert } from 'react-native'

import { deepClone } from '@/utils/deepClone'

describe('useTasksQueries Hook', () => {
  const tasksInitial: Task[] = [
    { id: 't1', description: 'T1 description', done: false },
    { id: 't2', description: 'T2 description', done: true },
  ]

  const newTask: Task = { id: 't3', description: 'T3 description', done: false }

  const Wrapper = ({ children }: any) => {
    return (
      <QueryClientProvider client={queryClientTest}>
        {children}
      </QueryClientProvider>
    )
  }

  const useAsyncStorageSpyResolveGetItem = (tasks: Task[]) =>
    jest
      .spyOn(AsyncStorage, 'getItem')
      .mockResolvedValueOnce(JSON.stringify(tasks))

  const useAsyncStorageSpyRejectSetItem = () =>
    jest.spyOn(AsyncStorage, 'setItem').mockRejectedValueOnce('rejected')

  const useInvalidateQueriesSpy = () =>
    jest.spyOn(queryClientTest, 'invalidateQueries')

  const useSetQueryDataSpy = () => jest.spyOn(queryClientTest, 'setQueryData')
  const useAlertSpy = () => jest.spyOn(Alert, 'alert')

  beforeEach(() => {
    jest.clearAllMocks()
    queryClientTest.removeQueries()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
  describe('Tasks Fetcher', () => {
    it('should load the stored tasks', async () => {
      useAsyncStorageSpyResolveGetItem(tasksInitial)

      const { result } = renderHook(() => useTasksQueries(), {
        wrapper: Wrapper,
      })
      await waitFor(() => expect(result).not.toBeNull())

      await waitFor(() => {
        expect(result.current.tasksQuery.isSuccess).toBe(true)
      })

      expect(result.current.tasksQuery.data).toEqual(tasksInitial)
    })

    it('on Invalid stored data should initialize the tasks List empty', async () => {
      jest
        .spyOn(AsyncStorage, 'getItem')
        .mockReturnValueOnce([{ id: 'ddd' }] as any)

      const removeItemSpy = jest.spyOn(AsyncStorage, 'removeItem')
      const alertSpy = useAlertSpy()

      const { result } = renderHook(() => useTasksQueries(), {
        wrapper: Wrapper,
      })
      await waitFor(() => expect(result).not.toBeNull())

      await waitFor(() => {
        expect(result.current.tasksQuery.isSuccess).toBe(true)
      })

      expect(result.current.tasksQuery.data).toEqual([])
      expect(removeItemSpy).toHaveBeenCalledTimes(1)
      expect(removeItemSpy).toBeCalledWith(STORAGE_KEY)

      expect(alertSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('addTaskMutation', () => {
    it('should save updated tasks after created new Tasks', async () => {
      useAsyncStorageSpyResolveGetItem(tasksInitial)

      const { result } = renderHook(() => useTasksQueries(), {
        wrapper: Wrapper,
      })
      await waitFor(() => expect(result).not.toBeNull())

      const { addTaskMutation } = result.current

      const updatedValue = tasksInitial.concat(newTask)

      await act(async () => {
        const value = await addTaskMutation.mutateAsync(updatedValue)

        expect(value).toHaveLength(3)
        expect(value.some((t) => t.id === newTask.id)).toBe(true)
      })
    })

    it('rollback the tasks state and trigger an alert to the user', async () => {
      useAsyncStorageSpyResolveGetItem(tasksInitial)
      useAsyncStorageSpyRejectSetItem()
      const invalidateQueriesSpy = useInvalidateQueriesSpy()
      const setQueryDataSpy = useSetQueryDataSpy()
      const alertSpy = useAlertSpy()

      const { result } = renderHook(() => useTasksQueries(queryClientTest), {
        wrapper: Wrapper,
      })
      await waitFor(() => expect(result).not.toBeNull())

      const { addTaskMutation } = result.current

      const updatedValue = deepClone(tasksInitial).concat(newTask)

      try {
        await act(async () => {
          await addTaskMutation.mutateAsync(updatedValue)
        })
      } catch {
        expect(setQueryDataSpy).toHaveBeenCalledTimes(2)
        // Returned to previous Data
        expect(setQueryDataSpy).toHaveBeenLastCalledWith(
          QUERY_KEY,
          tasksInitial,
        )

        expect(alertSpy).toHaveBeenCalledTimes(1)

        expect(invalidateQueriesSpy).toHaveBeenCalledTimes(1)
        expect(invalidateQueriesSpy).toBeCalledWith({ queryKey: QUERY_KEY })
      }
    })
  })

  describe('deleteTaskMutation', () => {
    it('should save updated Tasks after Delete', async () => {
      useAsyncStorageSpyResolveGetItem(tasksInitial)

      const { result } = renderHook(() => useTasksQueries(), {
        wrapper: Wrapper,
      })
      await waitFor(() => expect(result).not.toBeNull())

      const { deleteTaskMutation } = result.current
      const deletedTaskId = 't2'
      const updatedValue = tasksInitial.filter((t) => t.id !== deletedTaskId)

      await act(async () => {
        const value = await deleteTaskMutation.mutateAsync(updatedValue)

        expect(value.some((t) => t.id === deletedTaskId)).toBe(false)
        expect(value).toHaveLength(1)
      })
    })
    it('on Error should rollback the tasks state and trigger an alert to the user', async () => {
      useAsyncStorageSpyResolveGetItem(tasksInitial)
      useAsyncStorageSpyRejectSetItem()
      const invalidateQueriesSpy = useInvalidateQueriesSpy()
      const setQueryDataSpy = useSetQueryDataSpy()
      const alertSpy = useAlertSpy()

      const { result } = renderHook(() => useTasksQueries(queryClientTest), {
        wrapper: Wrapper,
      })
      await waitFor(() => expect(result).not.toBeNull())

      const { deleteTaskMutation } = result.current

      const deletedTaskId = 't2'
      const updatedValue = tasksInitial.filter((t) => t.id !== deletedTaskId)

      try {
        await act(async () => {
          await deleteTaskMutation.mutateAsync(updatedValue)
        })
      } catch {
        expect(setQueryDataSpy).toHaveBeenCalledTimes(2)
        expect(setQueryDataSpy).toHaveBeenLastCalledWith(
          QUERY_KEY,
          tasksInitial,
        )
        expect(alertSpy).toHaveBeenCalledTimes(1)
        expect(invalidateQueriesSpy).toHaveBeenCalledTimes(1)
        expect(invalidateQueriesSpy).toBeCalledWith({ queryKey: QUERY_KEY })
      }
    })
  })

  describe('updateTaskMutation', () => {
    it('should save updated tasks after change Status', async () => {
      useAsyncStorageSpyResolveGetItem(tasksInitial)

      const { result } = renderHook(() => useTasksQueries(), {
        wrapper: Wrapper,
      })
      await waitFor(() => expect(result).not.toBeNull())

      const { updateTaskStatusMutation } = result.current

      const updatedValue = deepClone(tasksInitial)
      updatedValue[0].done = true
      updatedValue[1].done = false

      await act(async () => {
        const value = await updateTaskStatusMutation.mutateAsync(updatedValue)

        expect(value[0].done).toBe(true)
        expect(value[1].done).toBe(false)
      })
    })

    it('on Error should rollback the tasks state and trigger an alert to the user', async () => {
      useAsyncStorageSpyResolveGetItem(tasksInitial)
      useAsyncStorageSpyRejectSetItem()
      const invalidateQueriesSpy = useInvalidateQueriesSpy()
      const setQueryDataSpy = useSetQueryDataSpy()
      const alertSpy = useAlertSpy()

      const { result } = renderHook(() => useTasksQueries(queryClientTest), {
        wrapper: Wrapper,
      })
      await waitFor(() => expect(result).not.toBeNull())

      const { updateTaskStatusMutation } = result.current

      const updatedValue = deepClone(tasksInitial)
      updatedValue[0].done = true
      updatedValue[1].done = false

      try {
        await act(async () => {
          await updateTaskStatusMutation.mutateAsync(updatedValue)
        })
      } catch {
        expect(setQueryDataSpy).toHaveBeenCalledTimes(2)
        // Returned to previous Data
        expect(setQueryDataSpy).toHaveBeenLastCalledWith(
          QUERY_KEY,
          tasksInitial,
        )

        expect(alertSpy).toHaveBeenCalledTimes(1)

        expect(invalidateQueriesSpy).toHaveBeenCalledTimes(1)
        expect(invalidateQueriesSpy).toBeCalledWith({ queryKey: QUERY_KEY })
      }
    })
  })
})
