import { FC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { PlusCircle } from 'phosphor-react-native'

import Logo from '@assets/logo-full.svg'

import { styles } from './styles'
import { colors } from '@/styles'
import { TaskInput } from './components/TaskInput'
import { EmptyFeedback } from './components/EmptyFeedback'

import { TaskCard } from './components/TaskCard'
import { useHomeController } from './controller'

export const Home: FC = () => {
  const { control, handleSubmit, onSubmit, tasks } = useHomeController()

  return (
    <View testID="screen-container" style={styles.container}>
      <View style={styles.header}>
        <Logo testID="logo" />
      </View>

      <View style={styles.body}>
        {/** Search Row */}
        <View style={styles.inputRow}>
          <TaskInput
            control={control}
            testID="input"
            placeholder="Add a new task"
            placeholderTextColor={colors['gray-300']}
          />

          <TouchableOpacity
            style={styles.addButton}
            testID="submit-button"
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

        {!tasks.length && <EmptyFeedback testID="empty-feedback" />}

        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} testID="task-card" />
        ))}
      </View>
    </View>
  )
}
