import { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { CheckBox } from '@/components/CheckBox'
import Trash from '@assets/trash.svg'

import { styles } from '../styles'

import { TaskCardProps } from '../types'

import { colors } from '@/styles'

const useRightActionAnimation = (progress: Animated.SharedValue<number>) => {
  const rightActionStyle = useAnimatedStyle(() => {
    const trans = progress.value * 0 // Adjust this value as needed
    const opacity = withTiming(progress.value, {
      duration: 50, // Adjust this value for the duration of the animation
    })
    return {
      opacity,
      transform: [{ translateX: -trans }],
    }
  })

  return rightActionStyle
}

export const TaskCardSmall: FC<TaskCardProps> = ({
  task,
  testID,
  onClickDelete,
  onClickCheck,
}) => {
  const isChecked = task.done

  const progress = useSharedValue(0)

  const rightActionStyle = useRightActionAnimation(progress)

  const onSwipeableOpen = () => {
    progress.value = 1
  }

  const onSwipeableClose = () => {
    progress.value = 0
  }

  const onPressDelete = () => {
    if (onClickDelete) {
      onClickDelete(task.id)
    }
  }
  return (
    <View style={[localStyles.wrapper, isChecked && styles.containerChecked]}>
      <Swipeable
        renderRightActions={() => (
          <Animated.View
            style={[rightActionStyle, { zIndex: 20, elevation: 20 }]}
          >
            <TouchableOpacity
              style={[localStyles.btnDelete]}
              onPress={onPressDelete}
            >
              <Trash />
            </TouchableOpacity>
          </Animated.View>
        )}
        onSwipeableOpen={onSwipeableOpen}
        onSwipeableClose={onSwipeableClose}
        useNativeAnimations={false}
        overshootRight={false}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={64}
      >
        <View testID={testID} style={[localStyles.viewSection]}>
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
        </View>
      </Swipeable>
    </View>
  )
}
const localStyles = StyleSheet.create({
  wrapper: {
    borderWidth: 2,
    borderColor: colors['gray-400'],
    borderRadius: 8,
    overflow: 'hidden',
  },
  viewSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingLeft: 12,
    paddingRight: 8,
  },
  btnDelete: {
    height: '100%',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: colors['gray-500'],
  },
})
