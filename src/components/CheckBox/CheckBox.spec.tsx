import { fireEvent, render, screen } from '@testing-library/react-native'
import { CheckBox } from '.'
import { Check } from 'phosphor-react-native'
import { colors } from '@/styles'

describe('CheckBox Component', () => {
  it('should render correctly with default props / unchecked', () => {
    render(<CheckBox testID="checkbox" />)
    const checkBox = screen.getByTestId('checkbox')

    expect(checkBox).toBeTruthy()
    expect(checkBox).toHaveStyle({
      borderRadius: 9999,
      borderColor: colors['blue-light'],
      backgroundColor: 'transparent',
    })

    const svg = screen.UNSAFE_getByType(Check)

    expect(svg).not.toBeVisible()
  })

  it('should render correctly checked', () => {
    render(<CheckBox testID="checkbox" value={true} />)
    const checkBox = screen.getByTestId('checkbox')

    expect(checkBox).toBeTruthy()
    expect(checkBox).toHaveStyle({
      borderColor: colors['purple-dark'],
      backgroundColor: colors['purple-dark'],
    })

    const svg = screen.UNSAFE_getByType(Check)

    expect(svg).toBeVisible()

    expect(svg.props.color).toBe(colors['gray-100'])
  })

  it('should call onValueChange with value true', () => {
    const onValueChangeMocked = jest.fn()
    render(<CheckBox testID="checkbox" onValueChange={onValueChangeMocked} />)

    const checkBox = screen.getByTestId('checkbox')

    fireEvent.press(checkBox)

    expect(onValueChangeMocked).toHaveBeenCalledWith(true)
  })

  it('should call onValueChange with value false', () => {
    const onValueChangeMocked = jest.fn()
    render(
      <CheckBox
        testID="checkbox"
        value={true}
        onValueChange={onValueChangeMocked}
      />,
    )

    const checkBox = screen.getByTestId('checkbox')

    fireEvent.press(checkBox)

    expect(onValueChangeMocked).toHaveBeenCalledWith(false)
  })
})
