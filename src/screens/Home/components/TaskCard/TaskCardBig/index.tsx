import { FC } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import Trash from '@assets/trash.svg'

import { CheckBox } from '@/components/CheckBox'

import { styles } from '../styles'

import { TaskCardProps } from '../types'

export const TaskCardBig: FC<TaskCardProps> = ({
  task,
  testID,
  onClickDelete,
  onClickCheck,
}) => {
  const isChecked = task.done

  return (
    <View
      testID={`${testID}`}
      style={[
        styles.container,
        styles.containerLarger,
        isChecked && styles.containerChecked,
      ]}
    >
      <CheckBox
        onValueChange={(value) => onClickCheck?.(task.id, value)}
        value={isChecked}
        testID={`${testID}-checkbox`}
      />
      <Text
        testID={`${testID}-text`}
        style={[styles.text, isChecked && styles.textChecked]}
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
