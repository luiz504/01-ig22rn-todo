import { useRef } from 'react'
import {
  GestureEventPayload,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  TapGestureHandler,
} from 'react-native-gesture-handler'

import {
  Easing,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const THRESHOLD = 52
export const useTaskCardSmallController = () => {
  const panableRef = useRef<PanGestureHandler>(null)
  const tapableRef = useRef<TapGestureHandler>(null)

  const translateX = useSharedValue(0)
  const isTapEnabled = useSharedValue(!!translateX.value)

  const onStart = (_: unknown, ctx: { startX: number }) => {
    ctx.startX = translateX.value
  }

  const onActive = (
    event: Readonly<GestureEventPayload & PanGestureHandlerEventPayload>,
    ctx: { startX: number },
  ) => {
    const maxWidth = THRESHOLD // Adjust this value to limit the range of the swipe
    const newX = ctx.startX + event.translationX
    const clampedX = Math.min(Math.max(newX, -maxWidth), 0)

    translateX.value = clampedX
  }

  const onEnd = (
    event: Readonly<GestureEventPayload & PanGestureHandlerEventPayload>,
  ) => {
    const OFFSET = 20

    const toValue = event.translationX < -THRESHOLD + OFFSET ? -THRESHOLD : 0

    translateX.value = withTiming(toValue, {
      duration: 200, // Adjust the duration as needed
      easing: Easing.inOut(Easing.ease),
    })

    if (translateX.value <= -THRESHOLD + OFFSET) {
      isTapEnabled.value = true
    }
  }

  const panGestureHandler = useAnimatedGestureHandler({
    onStart,
    onActive,
    onEnd,
  })

  const onTap = () => {
    if (isTapEnabled.value) {
      translateX.value = withTiming(0, {
        duration: 200, // Adjust the duration as needed
        easing: Easing.inOut(Easing.ease),
      })
      isTapEnabled.value = false
    }
  }

  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  })

  return {
    panableRef,
    tapableRef,
    cardAnimatedStyle,
    panGestureHandler,
    onTap,
    isTapEnabled,
    translateX,
    THRESHOLD,
    onStart,
    onEnd,
    onActive,
  }
}
