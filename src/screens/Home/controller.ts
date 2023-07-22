import { useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { Dimensions, TextInput } from 'react-native'
import { useTasksContext } from '@/context/tasksContext'

export interface Task {
  id: string
  description: string
  done: boolean
}

const formCreateTaskSchema = z.object({
  description: z.string().nonempty(),
})
type FormCreateTask = z.infer<typeof formCreateTaskSchema>

export const useHomeController = () => {
  const { control, handleSubmit, setValue } = useForm<FormCreateTask>({
    resolver: zodResolver(formCreateTaskSchema),
  })

  const handleCreateTask = useTasksContext().handleCreateTask

  const inputRef = useRef<TextInput>(null)

  const onSubmit = handleSubmit(async (data: FormCreateTask) => {
    await handleCreateTask(data)

    setValue('description', '')
    inputRef.current?.blur()
  })

  const minHeight850 = useMemo(() => {
    return Dimensions.get('window').height >= 850
  }, [])

  return {
    control,
    inputRef,
    onSubmit,
    minHeight850,
    handleCreateTask,
    setValue,
  }
}
