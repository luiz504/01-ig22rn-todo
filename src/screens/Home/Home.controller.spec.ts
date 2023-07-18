import { act, renderHook, waitFor } from '@testing-library/react-native'
import { useHomeController } from './controller'

describe('useHomeController Hook', () => {
  it('should add a new task on form submission', () => {
    const { result } = renderHook(() => useHomeController())

    const oldTaskLength = result.current.tasks.length
    act(() => {
      result.current.onSubmit({ description: 'New Fake Task' })
    })
    expect(result.current.tasks.length).toBe(oldTaskLength + 1)
    expect(
      result.current.tasks[result.current.tasks.length - 1].description,
    ).toBe('New Fake Task')
  })

  it('should clear the input value after success submission', async () => {
    const { result } = renderHook(() => useHomeController())
    result.current.setValue('description', 'New Fake Task')

    act(() => {
      result.current.onSubmit({ description: 'New Fake Task' })
    })

    await waitFor(() => {
      expect(result.current.getValues('description')).toBe('')
    })
  })
})
