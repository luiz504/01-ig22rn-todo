import React, { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'

import { CheckBox } from '@/components/CheckBox'
import Trash from '@assets/trash.svg'

import { styles } from '../styles'

import { TaskCardProps } from '../types'

import { colors } from '@/styles'
import { useTaskCardSmallController } from './controller'

export const TaskCardSmall: FC<TaskCardProps> = ({
  task,
  testID,
  onClickDelete,
  onClickCheck,
}) => {
  const isChecked = task.done

  const {
    panableRef,
    tapableRef,
    cardAnimatedStyle,
    panGestureHandler,
    onTap,
  } = useTaskCardSmallController()

  const onDeletePress = () => {
    onClickDelete?.(task.id)
  }

  return (
    <View
      testID={`${testID}`}
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
          testID={`${testID}-btn-delete`}
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
        <Animated.View
          testID={`${testID}-view-panable`}
          style={[cardAnimatedStyle, localStyles.swipableRow]}
        >
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
