import { FC, useState } from 'react'
import { Text, TextStyle, TouchableOpacity, View } from 'react-native'

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
}

export const TaskCard: FC<TaskCardProps> = ({
  task,
  testID,
  onClickDelete,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(task.done)

  const textDecorationLine: TextStyle['textDecorationLine'] = isChecked
    ? 'line-through'
    : 'none'
  const textColor: TextStyle['color'] = isChecked
    ? colors['gray-300']
    : colors['gray-100']

  return (
    <View testID={testID} style={styles.container}>
      <CheckBox
        onValueChange={(value) => setIsChecked(value)}
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
