import { fireEvent, render, screen } from '@testing-library/react-native'
import { CheckBox, styles } from '.'
import { Check } from 'phosphor-react-native'
import { colors } from '@/styles'

describe('CheckBox Component', () => {
  const testId = 'checkbox'

  it('should render correctly with default props / unchecked', () => {
    render(<CheckBox testID={testId} value={false} onValueChange={() => {}} />)
    const checkBox = screen.getByTestId(testId)

    expect(checkBox).toBeTruthy()
    expect(checkBox).toHaveStyle(styles.container)

    const svg = screen.UNSAFE_getByType(Check)

    expect(svg).not.toBeVisible()
  })

  it('should render correctly checked', () => {
    render(<CheckBox testID={testId} value={true} onValueChange={() => {}} />)
    const checkBox = screen.getByTestId(testId)

    expect(checkBox).toBeTruthy()
    expect(checkBox).toHaveStyle({
      ...styles.container,
      ...styles.containerChecked,
    })

    const svg = screen.UNSAFE_getByType(Check)

    expect(svg).toBeVisible()

    expect(svg.props.color).toBe(colors['gray-100'])
  })

  it('should call onValueChange with value true', () => {
    const onValueChangeMocked = jest.fn()
    render(
      <CheckBox
        testID={testId}
        value={false}
        onValueChange={onValueChangeMocked}
      />,
    )

    const checkBox = screen.getByTestId(testId)

    fireEvent.press(checkBox)

    expect(onValueChangeMocked).toHaveBeenCalledWith(true)
  })

  it('should call onValueChange with value false', () => {
    const onValueChangeMocked = jest.fn()
    render(
      <CheckBox
        testID={testId}
        value={true}
        onValueChange={onValueChangeMocked}
      />,
    )

    const checkBox = screen.getByTestId(testId)

    fireEvent.press(checkBox)

    expect(onValueChangeMocked).toHaveBeenCalledWith(false)
  })
})
