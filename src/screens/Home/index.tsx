import { FlatList, Text, TouchableOpacity, View } from 'react-native'

import Logo from '@assets/logo-full.svg'
import PlusCircle from '@assets/plus.svg'

import { styles } from './styles'
import { colors } from '@/styles'

import { TaskInput } from './components/TaskInput'
import { EmptyFeedback } from './components/EmptyFeedback'
import { TaskCard } from './components/TaskCard'

import { useHomeController } from './controller'
import { useTasksContext } from '@/context/tasksContext'

export const Home = () => {
  const { control, inputRef, onSubmit, minHeight850 } = useHomeController()

  const tasks = useTasksContext().tasks
  const tasksCreated = useTasksContext().tasksCreated
  const tasksDone = useTasksContext().tasksDone
  const isLoading = useTasksContext().isLoading

  return (
    <View testID="screen-container" style={styles.container}>
      <View style={[styles.header, minHeight850 && styles.headerTall]}>
        <Logo testID="logo" />
      </View>

      <View style={styles.body}>
        {/** Search Row */}
        <View style={styles.inputRow}>
          <TaskInput
            control={control}
            ref={inputRef}
            testID="input"
            placeholder="Add a new task"
            placeholderTextColor={colors['gray-300']}
          />

          <TouchableOpacity
            style={styles.addButton}
            testID="submit-button"
            onPress={onSubmit}
          >
            <PlusCircle width={24} height={24} testID="plus-icon" />
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
            <Text style={styles.summaryCounter}>{tasksCreated}</Text>
          </View>

          <View style={styles.summaryBadge}>
            <Text
              style={{ ...styles.summaryLabel, color: colors['purple-light'] }}
            >
              Done
            </Text>
            <Text style={styles.summaryCounter}>{tasksDone}</Text>
          </View>
        </View>

        {!tasks.length && <EmptyFeedback testID="empty-feedback" />}

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ rowGap: 8 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <TaskCard task={item} testID="task-card" />}
        />
        {isLoading && <Text> Loading ...</Text>}
      </View>
    </View>
  )
}
