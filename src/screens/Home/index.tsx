import { FC, useMemo } from 'react'
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { PlusCircle } from 'phosphor-react-native'

import Logo from '@assets/logo-full.svg'

import { styles } from './styles'
import { colors } from '@/styles'
import { TaskInput } from './components/TaskInput'
import { EmptyFeedback } from './components/EmptyFeedback'

import { TaskCard } from './components/TaskCard'
import { useHomeController } from './controller'

export const Home: FC = () => {
  const {
    control,
    inputRef,
    tasks,
    tasksCreated,
    tasksDone,
    onSubmit,
    handleDeleteTask,
    handleCheckTask,
  } = useHomeController()

  const minHeight850 = useMemo(() => {
    return Dimensions.get('window').height >= 850
  }, [])

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
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              testID="task-card"
              onClickDelete={handleDeleteTask}
              onClickCheck={handleCheckTask}
            />
          )}
        />
      </View>
    </View>
  )
}
