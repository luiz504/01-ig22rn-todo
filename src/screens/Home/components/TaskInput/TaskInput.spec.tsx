import { fireEvent, render, screen } from '@testing-library/react-native'
import { useController } from 'react-hook-form'

import { TaskInput } from '.'
import { colors } from '@/styles'

jest.mock('react-hook-form')
const control = {
  field: {
    onChange: jest.fn(),
    onBlur: jest.fn(),
    value: '',
  },
}
const useControllerMocked = jest.mocked(useController)
describe('TaskInput Component', () => {
  it('should render correctly with the specified styles', () => {
    useControllerMocked.mockReturnValue(control as any)

    render(<TaskInput placeholder="Placeholder" control={control as any} />)

    const input = screen.getByPlaceholderText('Placeholder')
    expect(input).toBeTruthy()
    expect(input).toHaveStyle({
      flex: 1,
      backgroundColor: colors['gray-500'],
      fontSize: 16,
      color: colors['gray-100'],
      padding: 16,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: colors['gray-500'],
      borderStyle: 'solid',
    })
  })

  it('should change border color when focused', () => {
    useControllerMocked.mockReturnValue(control as any)
    render(<TaskInput placeholder="Placeholder" control={control as any} />)

    const input = screen.getByPlaceholderText('Placeholder')

    fireEvent(input, 'focus')

    expect(input).toHaveStyle({ borderColor: colors['purple-dark'] })
  })

  it('should return to the default border color when blurred', () => {
    useControllerMocked.mockReturnValue(control as any)
    render(<TaskInput placeholder="Placeholder" control={control as any} />)

    const input = screen.getByPlaceholderText('Placeholder')

    fireEvent(input, 'focus')

    expect(input).toHaveStyle({ borderColor: colors['purple-dark'] })

    fireEvent(input, 'blur')

    expect(input).toHaveStyle({ borderColor: colors['gray-500'] })
  })

  it('should call field.onChange with the input value when text changes', () => {
    const control = jest.fn()
    const onChangeMock = jest.fn()
    useControllerMocked.mockReturnValue({
      field: { onChange: onChangeMock },
    } as any)
    render(<TaskInput placeholder="Placeholder" control={control as any} />)

    const input = screen.getByPlaceholderText('Placeholder')

    const eventText = 'Hello world'
    fireEvent.changeText(input, eventText)

    expect(onChangeMock).toHaveBeenCalledWith(eventText)
  })
})
