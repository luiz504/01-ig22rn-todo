import React, { FC, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler'
import Animated, {
  Easing,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { CheckBox } from '@/components/CheckBox'
import Trash from '@assets/trash.svg'

import { styles } from '../styles'

import { TaskCardProps } from '../types'

import { colors } from '@/styles'

const THRESHOLD = 52

export const TaskCardSmall: FC<TaskCardProps> = ({
  task,
  testID,
  onClickDelete,
  onClickCheck,
}) => {
  const isChecked = task.done

  const panableRef = useRef<PanGestureHandler>(null)
  const tapableRef = useRef<TapGestureHandler>(null)

  const translateX = useSharedValue(0)
  const isTabEnabled = useSharedValue(!!translateX.value)

  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: { startX: number }) => {
      ctx.startX = translateX.value
    },
    onActive: (event, ctx: { startX: number }) => {
      const maxWidth = THRESHOLD // Adjust this value to limit the range of the swipe
      const newX = ctx.startX + event.translationX
      const clampedX = Math.min(Math.max(newX, -maxWidth), 0)

      translateX.value = clampedX
    },
    onEnd: (event) => {
      const OFFSET = 20
      const toValue = event.translationX < -THRESHOLD + OFFSET ? -THRESHOLD : 0
      translateX.value = withTiming(toValue, {
        duration: 200, // Adjust the duration as needed
        easing: Easing.inOut(Easing.ease),
      })

      if (translateX.value <= -THRESHOLD + OFFSET) {
        isTabEnabled.value = true
      }
    },
  })

  const onTap = () => {
    if (isTabEnabled.value) {
      translateX.value = withTiming(0, {
        duration: 200, // Adjust the duration as needed
        easing: Easing.inOut(Easing.ease),
      })
      isTabEnabled.value = false
    }
  }

  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  })

  const onDeletePress = () => {
    if (onClickDelete) {
      onClickDelete(task.id)
    }
  }

  return (
    <View
      testID={`${testID}-small`}
      style={[localStyles.wrapper, isChecked && styles.containerChecked]}
    >
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          },
        ]}
      >
        <TouchableOpacity
          style={[localStyles.btnDelete]}
          onPress={onDeletePress}
        >
          <Trash />
        </TouchableOpacity>
      </Animated.View>

      <PanGestureHandler
        ref={panableRef}
        simultaneousHandlers={[tapableRef]}
        waitFor={panableRef}
        onGestureEvent={panGestureHandler}
      >
        <Animated.View style={[cardAnimatedStyle, localStyles.swipableRow]}>
          <View style={[localStyles.checkBoxSection]}>
            <CheckBox
              onValueChange={(value) => onClickCheck?.(task.id, value)}
              value={isChecked}
              testID={`${testID}-checkbox`}
            />
          </View>

          <TapGestureHandler ref={tapableRef} onHandlerStateChange={onTap}>
            <View style={[localStyles.textSection]} pointerEvents="box-none">
              <Text
                testID={`${testID}-text`}
                style={[
                  styles.text,
                  { flexShrink: 1 },
                  isChecked && styles.textChecked,
                ]}
              >
                {task.description}
              </Text>
            </View>
          </TapGestureHandler>
        </Animated.View>
      </PanGestureHandler>
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
  swipableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors['gray-500'],
    overflow: 'hidden',
  },
  checkBoxSection: {
    paddingVertical: 12,
    paddingLeft: 12,
  },
  textSection: {
    paddingVertical: 12,
    paddingRight: 8,
    flex: 1,
  },
  btnDelete: {
    height: '100%',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: colors['gray-400'],
  },
})
