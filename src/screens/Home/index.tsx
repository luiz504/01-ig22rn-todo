import { FC, useRef, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { PlusCircle } from 'phosphor-react-native'

import Logo from '@assets/logo-full.svg'

import { styles } from './styles'
import { colors } from '@/styles'
import { TaskInput } from './components/TaskInput'
import { EmptyFeedback } from './components/EmptyFeedback'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { generateRandomId } from '@/utils/generateRandomId'
interface Task {
  id: string
  description: string
  done: boolean
}

const formCreateTaskSchema = z.object({
  description: z.string().nonempty(),
})
type FormCreateTask = z.infer<typeof formCreateTaskSchema>
export const Home: FC = () => {
  const inputRef = useRef<TextInput>(null)
  const { control, handleSubmit, setValue } = useForm<FormCreateTask>({
    resolver: zodResolver(formCreateTaskSchema),
  })

  const [tasks, setTasks] = useState<Task[]>([
    { description: ' Hello moto', done: false, id: '123123' },
  ])

  const onSubmit = (data: FormCreateTask) => {
    setTasks((old) =>
      old.concat({
        id: generateRandomId(),
        description: data.description,
        done: false,
      }),
    )
    setValue('description', '')
  }

  return (
    <View testID="screen-container" style={styles.container}>
      <View style={styles.header}>
        <Logo />
      </View>

      <View style={styles.body}>
        {/** Search Row */}
        <View style={styles.inputRow}>
          <TaskInput
            ref={inputRef}
            control={control}
            testID="input"
            placeholder="Add a new task"
            placeholderTextColor={colors['gray-300']}
          />

          <TouchableOpacity
            style={styles.addButton}
            testID="btn-add"
            onPress={handleSubmit(onSubmit)}
          >
            <PlusCircle color={colors['gray-100']} weight="bold" size={24} />
          </TouchableOpacity>
        </View>

        {/** Summary Row */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryBadge}>
            <Text
              style={{ ...styles.summaryLabel, color: colors['blue-light'] }}
            >
              Created
            </Text>
            <Text style={styles.summaryCounter}>0</Text>
          </View>

          <View style={styles.summaryBadge}>
            <Text
              style={{ ...styles.summaryLabel, color: colors['purple-light'] }}
            >
              Done
            </Text>
            <Text style={styles.summaryCounter}>0</Text>
          </View>
        </View>

        {!tasks.length && <EmptyFeedback />}
        {tasks.map((task) => (
          <Text key={task.id}>{task.id}</Text>
        ))}
      </View>
    </View>
  )
}
