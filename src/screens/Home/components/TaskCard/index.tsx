import { FC, useMemo } from 'react'
import {
  Dimensions,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import Trash from '@assets/trash.svg'

import { CheckBox } from '@/components/CheckBox'

import { colors } from '@/styles'

import { styles } from './styles'

interface Task {
  id: string
  description: string
  done: boolean
}

interface TaskCardProps {
  task: Task
  testID?: string
  onClickDelete?: (id: string) => void
  onClickCheck?: (id: string, value: boolean) => void
}

export const TaskCard: FC<TaskCardProps> = ({
  task,
  testID,
  onClickDelete,
  onClickCheck,
}) => {
  const isChecked = task.done

  const textDecorationLine: TextStyle['textDecorationLine'] = isChecked
    ? 'line-through'
    : 'none'
  const textColor: TextStyle['color'] = isChecked
    ? colors['gray-300']
    : colors['gray-100']
  const backgroundColor: ViewStyle['backgroundColor'] = isChecked
    ? colors['gray-500']
    : colors['gray-400']

  const minWidth768 = useMemo(() => {
    return Dimensions.get('window').width >= 768
  }, [])

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        { backgroundColor },
        minWidth768 && styles.containerLarger,
      ]}
    >
      <CheckBox
        onValueChange={(value) => onClickCheck?.(task.id, value)}
        value={isChecked}
        testID={`${testID}-checkbox`}
      />

      <Text
        testID={`${testID}-text`}
        style={[
          styles.text,
          {
            textDecorationLine,
            color: textColor,
          },
        ]}
      >
        {task.description}
      </Text>

      <TouchableOpacity
        testID={`${testID}-btn-delete`}
        style={styles.btnDelete}
        onPress={() => onClickDelete?.(task.id)}
      >
        <Trash />
      </TouchableOpacity>
    </View>
  )
}
