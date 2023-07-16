import { FC, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { styles } from './styles'

import { CheckBox } from '@/components/CheckBox'
import Trash from '@assets/trash.svg'
import { colors } from '@/styles'

interface Task {
  id: string
  description: string
  done: boolean
}

interface TaskCardProps {
  task: Task
}

export const TaskCard: FC<TaskCardProps> = ({ task }) => {
  const [isChecked, setIsChecked] = useState(task.done)

  return (
    <View style={styles.container}>
      <CheckBox
        onValueChange={(value) => setIsChecked(value)}
        value={isChecked}
        aria-labelledby="checkbox"
      />

      <Text
        style={[
          styles.text,
          {
            textDecorationLine: isChecked ? 'line-through' : 'none',
            color: isChecked ? colors['gray-300'] : colors['gray-100'],
          },
        ]}
      >
        {task.description}
      </Text>

      <TouchableOpacity style={styles.btnDelete}>
        <Trash />
      </TouchableOpacity>
    </View>
  )
}
