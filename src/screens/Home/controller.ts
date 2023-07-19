import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { generateRandomId } from '@/utils/generateRandomId'
import { TextInput } from 'react-native'

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
  const { control, handleSubmit, setValue, getValues } =
    useForm<FormCreateTask>({
      resolver: zodResolver(formCreateTaskSchema),
    })

  const inputRef = useRef<TextInput>(null)
  const [tasks, setTasks] = useState<Task[]>([
    {
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet numquam at, nemo possimus impedit cumque ipsa dolorem officia accusamus minus qui perspiciatis aperiam, esse error alias sapiente ullam delectus eum?',
      done: false,
      id: '123123',
    },
  ])

  const tasksCreated = tasks.length
  const tasksDone = tasks.filter((task) => task.done).length

  const onSubmit = handleSubmit((data: FormCreateTask) => {
    const newTask = {
      id: generateRandomId(),
      description: data.description,
      done: false,
    }
    setTasks((old) => [newTask, ...old])
    setValue('description', '')
    inputRef.current?.blur()
  })

  const handleDeleteTask = (id: string) => {
    setTasks((old) => old.filter((old) => old.id !== id))
  }

  const handleCheckTask = (id: string, value: boolean) => {
    const isChecked = !!tasks.find((task) => task.id === id)?.done

    if (typeof isChecked === 'boolean' && isChecked !== value) {
      setTasks((old) =>
        old.map((item) => (item.id === id ? { ...item, done: value } : item)),
      )
    }
  }

  const testMethods =
    process.env.NODE_ENV === 'test'
      ? { setTasks, setValue, getValues }
      : undefined

  return {
    control,
    inputRef,
    tasks,
    tasksCreated,
    tasksDone,
    handleDeleteTask,
    handleCheckTask,
    onSubmit,
    ...testMethods,
  }
}
