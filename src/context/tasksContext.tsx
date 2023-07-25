import React, { FC, createContext, useContext } from 'react'

import { Task, useTasksQueries } from '@/hooks/useTasksQueries'
import { generateRandomId } from '@/utils/generateRandomId'
import { deepClone } from '@/utils/deepClone'

type TasksContextType = {
  tasks: Task[]
  tasksDone: number
  tasksCreated: number
  isLoading: boolean
  handleCreateTask: (data: { description: string }) => Promise<void>
  isCreating: boolean
  handleDeleteTask: (id: string) => Promise<void>
  isDeleting: boolean
  handleUpdateTaskStatus: (id: string, value: boolean) => Promise<void>
  isUpdating: boolean
}

export const TasksContext = createContext<TasksContextType>(
  {} as TasksContextType,
)

type TasksContextProviderProps = {
  children: React.ReactNode
}

export const TasksContextProvider: FC<TasksContextProviderProps> = ({
  children,
}) => {
  const {
    tasksQuery,
    addTaskMutation,
    deleteTaskMutation,
    updateTaskStatusMutation,
  } = useTasksQueries()

  const tasks = tasksQuery.data || []

  const handleCreateTask = async (
    data: ExtractFCParam<TasksContextType['handleCreateTask']>,
  ) => {
    const newTasks: Task = {
      id: generateRandomId(),
      description: data.description,
      done: false,
    }

    await addTaskMutation.mutateAsync([newTasks, ...tasks])
  }

  const handleDeleteTask: TasksContextType['handleDeleteTask'] = async (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id)
    await deleteTaskMutation.mutateAsync(updatedTasks)
  }

  const handleUpdateTaskStatus: TasksContextType['handleUpdateTaskStatus'] =
    async (id, value) => {
      const taskIndex = tasks.findIndex((task) => task.id === id)
      const task = tasks[taskIndex]

      if (task && task.done === !value) {
        const updatedTasks = deepClone(tasks)
        updatedTasks[taskIndex].done = value

        await updateTaskStatusMutation.mutateAsync(updatedTasks)
      }
    }

  const tasksCreated = tasks.length
  const tasksDone = tasks.filter((task) => task.done).length
  const isLoading = tasksQuery.isLoading
  const isCreating = addTaskMutation.isLoading
  const isDeleting = deleteTaskMutation.isLoading
  const isUpdating = updateTaskStatusMutation.isLoading

  return (
    <TasksContext.Provider
      value={{
        tasks,
        tasksCreated,
        tasksDone,
        isLoading,
        isUpdating,
        handleCreateTask,
        isCreating,
        handleDeleteTask,
        isDeleting,
        handleUpdateTaskStatus,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export const useTasksContext = () => {
  const context = useContext(TasksContext)

  if (!Object.keys(context).length) {
    throw new Error('useTasksContext Must be used under TasksContextProvider')
  }

  return context
}
