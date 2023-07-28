import React, { FC } from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { GestureDetector } from 'react-native-gesture-handler'
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

  const { cardAnimatedStyle, tapGestureHandler, panGestureHandler } =
    useTaskCardSmallController()

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
        <TouchableHighlight
          style={[localStyles.btnDelete]}
          onPress={onDeletePress}
          testID={`${testID}-btn-delete`}
          underlayColor={'rgba(255,100,100, .1)'}
        >
          <Trash />
        </TouchableHighlight>
      </Animated.View>

      <GestureDetector gesture={panGestureHandler}>
        <Animated.View
          testID={`${testID}-view-panable`}
          style={[cardAnimatedStyle, localStyles.panableRow]}
        >
          <View style={[localStyles.checkBoxSection]}>
            <CheckBox
              onValueChange={(value) => onClickCheck?.(task.id, value)}
              value={isChecked}
              testID={`${testID}-checkbox`}
            />
          </View>

          <GestureDetector gesture={tapGestureHandler}>
            <View style={[localStyles.textSection]}>
              <Text
                testID={`${testID}-text`}
                style={[styles.text, isChecked && styles.textChecked]}
              >
                {task.description}
              </Text>
            </View>
          </GestureDetector>
        </Animated.View>
      </GestureDetector>
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
  panableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors['gray-500'],
    overflow: 'hidden',
  },
  checkBoxSection: {
    paddingVertical: 12,
    paddingLeft: 12,
  },
  textSection: {
    paddingVertical: 12,
    paddingRight: 12,
    flex: 1,
    height: '100%',
  },
  btnDelete: {
    height: '100%',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: colors['gray-400'],
  },
})
