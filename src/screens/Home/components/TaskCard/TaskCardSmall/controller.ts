import { useMemo } from 'react'
import { Gesture } from 'react-native-gesture-handler'

import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const THRESHOLD = 52
const ANIMATION_DURATION = 200
export const useTaskCardSmallController = () => {
  const translateX = useSharedValue(0)
  const isTapEnabled = useSharedValue(!!translateX.value)

  const panGestureHandler = useMemo(
    () =>
      Gesture.Pan()
        .onUpdate((event) => {
          if (event.translationX > 0) return

          const clampedX = Math.min(Math.max(event.translationX, -THRESHOLD), 0)

          translateX.value = clampedX
        })
        .onEnd((event) => {
          const ACTIVATION_OFFSET = 20

          const toValue =
            event.translationX < -THRESHOLD + ACTIVATION_OFFSET ? -THRESHOLD : 0

          translateX.value = withTiming(toValue, {
            duration: ANIMATION_DURATION,
            easing: Easing.inOut(Easing.ease),
          })

          if (translateX.value <= -THRESHOLD + ACTIVATION_OFFSET) {
            isTapEnabled.value = true
          }
        })
        .shouldCancelWhenOutside(true)
        .minDistance(20)

        .withTestId('pan'),

    [isTapEnabled, translateX],
  )

  const tapGestureHandler = useMemo(
    () =>
      Gesture.Tap()
        .onStart(() => {
          if (isTapEnabled.value) {
            translateX.value = withTiming(0, {
              duration: ANIMATION_DURATION,
              easing: Easing.inOut(Easing.ease),
            })
            isTapEnabled.value = false
          }
        })
        .withTestId('tap'),

    [translateX, isTapEnabled],
  )

  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  })

  return {
    cardAnimatedStyle,
    isTapEnabled,
    translateX,
    THRESHOLD,
    panGestureHandler,
    tapGestureHandler,
  }
}
