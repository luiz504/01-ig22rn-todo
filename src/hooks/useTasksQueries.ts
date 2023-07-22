import { queryClient } from '@/libs/queryClient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Alert } from 'react-native'
import { z } from 'zod'

const taskSchema = z.object({
  id: z.string().nonempty(),
  description: z.string().nonempty(),
  done: z.boolean(),
})
const tasksSchema = z.array(taskSchema)

export type Task = z.infer<typeof taskSchema>

const STORAGE_KEY = '@tasks'
const QUERY_KEY = [STORAGE_KEY]

const fetchTasks = async (): Promise<Task[]> => {
  const storedTasks = await AsyncStorage.getItem(STORAGE_KEY)

  if (!storedTasks) return []

  try {
    const tasksStored = JSON.parse(storedTasks)
    await tasksSchema.parseAsync(tasksStored)
    return tasksStored
  } catch (err) {
    await AsyncStorage.removeItem(STORAGE_KEY)
    Alert.alert('Error while loading tasks', 'Resetting Tasks Store')
    return []
  }
}

const saveTasks = async (tasks: Task[]) => {
  // await new Promise((resolve, reject) => {
  //   setTimeout(() => reject(new Error('12312')), 1000)
  // })
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}
export const useTasksQueries = () => {
  const tasksQuery = useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchTasks,
  })

  const addTaskMutation = useMutation({
    mutationFn: async (updatedTasks: Task[]) => {
      return saveTasks(updatedTasks).then(() => updatedTasks)
    },
    onMutate: async (updatedTasks: Task[]) => {
      // Prevent Overwrite
      await queryClient.cancelQueries({ queryKey: QUERY_KEY })

      const previousTasks = await queryClient.getQueryData(QUERY_KEY)

      queryClient.setQueryData(QUERY_KEY, updatedTasks)

      return { previousTasks }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(QUERY_KEY, context?.previousTasks || [])
      Alert.alert(
        'Fail to create new Task.',
        'Returning the previous tasks state.',
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })

  const deleteTaskMutation = useMutation({
    mutationFn: async (updatedTasks: Task[]) => {
      return saveTasks(updatedTasks).then(() => updatedTasks)
    },
    onMutate: async (updatedTasks: Task[]) => {
      // Prevent Overwrite
      await queryClient.cancelQueries({ queryKey: QUERY_KEY })

      const previousTasks = await queryClient.getQueryData(QUERY_KEY)

      queryClient.setQueryData(QUERY_KEY, updatedTasks)

      return { previousTasks }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(QUERY_KEY, context?.previousTasks || [])
      Alert.alert('Fail to delete Task.', 'Returning the previous tasks state.')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })

  const updateTaskStatusMutation = useMutation({
    mutationFn: async (updatedTasks: Task[]) => {
      return saveTasks(updatedTasks).then(() => updatedTasks)
    },
    onMutate: async (updatedTasks: Task[]) => {
      // Prevent Overwrite
      await queryClient.cancelQueries({ queryKey: QUERY_KEY })

      const previousTasks = await queryClient.getQueryData(QUERY_KEY)

      queryClient.setQueryData(QUERY_KEY, updatedTasks)

      return { previousTasks }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(QUERY_KEY, context?.previousTasks || [])
      Alert.alert('Fail to update Task.', 'Returning the previous tasks state.')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })

  return {
    tasksQuery,
    addTaskMutation,
    deleteTaskMutation,
    updateTaskStatusMutation,
  }
}
