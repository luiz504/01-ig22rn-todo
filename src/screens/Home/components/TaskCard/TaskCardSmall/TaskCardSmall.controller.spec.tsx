import { act, render, renderHook } from '@testing-library/react-native'
import { useTaskCardSmallController } from './controller'
import {
  GestureDetector,
  GestureHandlerRootView,
  State,
} from 'react-native-gesture-handler'
import {
  fireGestureHandler,
  getByGestureTestId,
} from 'react-native-gesture-handler/jest-utils'
import { View } from 'react-native'
import {
  withReanimatedTimer,
  advanceAnimationByTime,
} from 'react-native-reanimated/src/reanimated2/jestUtils'
import * as RNR from 'react-native-reanimated'

describe('useTaskCardSmallController', () => {
  describe('tapGestureHandler', () => {
    it('should reset translateX and isTapEnabled to their default values when tapped', async () => {
      const { result } = renderHook(() => useTaskCardSmallController())
      const { tapGestureHandler } = result.current

      render(
        <GestureDetector gesture={tapGestureHandler}>
          <View />
        </GestureDetector>,

        { wrapper: GestureHandlerRootView },
      )

      const { isTapEnabled, translateX } = result.current

      // Preparation for Action
      act(() => {
        translateX.value = 50
        isTapEnabled.value = true
      })

      expect(translateX.value).toBe(50)
      expect(isTapEnabled.value).toBe(true)

      // Actions
      act(() => {
        fireGestureHandler(getByGestureTestId('tap'), [{ state: State.ACTIVE }])
      })

      // Results
      expect(translateX.value).toBe(0)
      expect(isTapEnabled.value).toBe(false)
    })

    it('should do nothing if isTapEnabled is false', () => {
      const { result } = renderHook(() => useTaskCardSmallController())
      const { isTapEnabled, translateX, tapGestureHandler } = result.current

      render(
        <GestureDetector gesture={tapGestureHandler}>
          <View />
        </GestureDetector>,

        { wrapper: GestureHandlerRootView },
      )

      // Preparation to Action
      const dummyTranslateX = 'dummyValue'.length
      act(() => {
        translateX.value = dummyTranslateX
        isTapEnabled.value = false
      })
      expect(isTapEnabled.value).toBe(false)

      const withTimingSpy = jest.spyOn(RNR, 'withTiming')

      act(() => {
        fireGestureHandler(getByGestureTestId('tap'), [{ state: State.ACTIVE }])
      })

      expect(withTimingSpy).not.toHaveBeenCalled()
      expect(translateX.value).toBe(dummyTranslateX)
    })
  })

  describe('panGestureHandler', () => {
    it('should open the swipeable area when swiped and released, passing the THRESHOLD offset', () => {
      withReanimatedTimer(async () => {
        const { result } = renderHook(() => useTaskCardSmallController())
        const { panGestureHandler, isTapEnabled, translateX, THRESHOLD } =
          result.current

        render(
          <GestureDetector gesture={panGestureHandler}>
            <View />
          </GestureDetector>,

          { wrapper: GestureHandlerRootView },
        )

        act(() => {
          fireGestureHandler(getByGestureTestId('pan'), [
            { translationX: 20 },
            { translationX: 50 },
            { translationX: -33, state: State.END },
          ])
        })
        advanceAnimationByTime(200)

        expect(translateX.value).toBe(-THRESHOLD)
        expect(isTapEnabled.value).toBe(true)
      })
    })

    it('should not open the swipeable area when not swiped to the right or not reaching the THRESHOLD offset', () => {
      withReanimatedTimer(async () => {
        const { result } = renderHook(() => useTaskCardSmallController())
        const { panGestureHandler, isTapEnabled, translateX } = result.current

        render(
          <GestureDetector gesture={panGestureHandler}>
            <View />
          </GestureDetector>,

          { wrapper: GestureHandlerRootView },
        )
        // Not Reach the threshold offset
        act(() => {
          fireGestureHandler(getByGestureTestId('pan'), [
            { translationX: -20 },
            { translationX: -50 },
            { translationX: -32, state: State.END },
          ])
        })
        advanceAnimationByTime(200)

        expect(translateX.value).toBe(0)
        expect(isTapEnabled.value).toBe(false)

        // Swipe Right
        act(() => {
          fireGestureHandler(getByGestureTestId('pan'), [
            { translationX: 32, state: State.END },
          ])
        })
        advanceAnimationByTime(200)

        expect(translateX.value).toBe(0)
        expect(isTapEnabled.value).toBe(false)
      })
    })
  })
})
