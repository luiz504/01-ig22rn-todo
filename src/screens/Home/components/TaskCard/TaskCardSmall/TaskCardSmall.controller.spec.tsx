import { act, renderHook } from '@testing-library/react-native'
import { useTaskCardSmallController } from './controller'

describe('useTaskCardSmallController', () => {
  describe('onTap', () => {
    it('should assigning translateX.value to 0 when isTapEnabled is true', async () => {
      const { result } = renderHook(() => useTaskCardSmallController())

      const { isTapEnabled, translateX, onTap } = result.current

      act(() => {
        translateX.value = 50
        isTapEnabled.value = true
      })

      act(() => {
        onTap()
      })

      await new Promise((resolve) => setTimeout(() => resolve('1'), 200))

      expect(translateX.value).toBe(0)
    })

    it('should do nothing if isTapEnabled is false', () => {
      const { result } = renderHook(() => useTaskCardSmallController())

      const { isTapEnabled, translateX, onTap } = result.current

      act(() => {
        translateX.value = 30
        isTapEnabled.value = false
      })

      act(() => {
        onTap()
      })

      expect(translateX.value).toBe(30)
    })
  })

  describe('panGestureHandler', () => {
    describe('onStart', () => {
      it('should update ctx.startX correctly', () => {
        const { result } = renderHook(() => useTaskCardSmallController())
        const ctx = { startX: 0 }

        act(() => {
          result.current.onStart({}, ctx)
        })

        expect(ctx.startX).toBe(result.current.translateX.value)

        act(() => {
          result.current.onStart({}, { startX: result.current.THRESHOLD })
        })

        expect(ctx.startX).toBe(result.current.translateX.value)
      })
    })

    describe('onActive', () => {
      it('should update translateX.value correctly', () => {
        const { result } = renderHook(() => useTaskCardSmallController())
        // should start as 0
        expect(result.current.translateX.value).toBe(0)

        const ctx = { startX: 0 }

        const translationX = -40
        act(() => {
          result.current.onActive({ translationX } as any, ctx)
        })

        expect(result.current.translateX.value).toBe(translationX)
      })

      it('should clamp translateX to the left with the designed THRESHOLD', () => {
        const { result } = renderHook(() => useTaskCardSmallController())

        const ctx = { startX: 0 }

        const translationX = -500

        act(() => {
          result.current.onActive({ translationX } as any, ctx)
        })

        expect(result.current.translateX.value).toBe(-result.current.THRESHOLD)
      })

      it('should not translateX to the right', () => {
        const { result } = renderHook(() => useTaskCardSmallController())
        const ctx = { startX: 0 }

        const translationX = 500
        act(() => {
          result.current.onActive({ translationX } as any, ctx)
        })

        expect(result.current.translateX.value).toBe(0)
      })
    })
  })
  describe('onEnd', () => {
    it('should update translateX.value and isTapEnabled.value correctly when success', () => {
      jest.useFakeTimers()
      const { result } = renderHook(() => useTaskCardSmallController())

      const { THRESHOLD } = result.current

      act(() => {
        result.current.onEnd({ translationX: -THRESHOLD } as any)
      })

      expect(result.current.translateX.value).toBe(-THRESHOLD)
      expect(result.current.isTapEnabled.value).toBe(true)
    })

    it('should update translateX.value and isTapEnabled.value correctly when fail', () => {
      jest.useFakeTimers()
      const { result } = renderHook(() => useTaskCardSmallController())

      const { THRESHOLD } = result.current

      act(() => {
        // -THRESHOLD + 20 will successfully open
        result.current.onEnd({ translationX: -THRESHOLD + 21 } as any)
      })

      expect(result.current.translateX.value).toBe(0)
      expect(result.current.isTapEnabled.value).toBe(false)
    })
  })
})
