import { fireEvent, render, screen } from '@testing-library/react-native'
import { CheckBox, styles } from '.'

describe('CheckBox Component', () => {
  const testId = 'checkbox'

  it('should render correctly with default props (unchecked)', () => {
    render(<CheckBox testID={testId} value={false} onValueChange={() => {}} />)
    const checkBox = screen.getByTestId(testId)

    expect(checkBox).toBeTruthy()
    expect(checkBox).toHaveStyle(styles.container)

    const svgElement = screen.getByTestId(`${testId}-check-icon`)

    expect(svgElement).not.toBeVisible()
  })

  it('should render correctly when checked', () => {
    render(
      <CheckBox
        testID={testId}
        value={true}
        size={50}
        onValueChange={() => {}}
      />,
    )
    const checkBox = screen.getByTestId(testId)

    expect(checkBox).toBeTruthy()
    expect(checkBox).toHaveStyle({
      ...styles.container,
      ...styles.containerChecked,
    })

    const svgElement = screen.getByTestId(`${testId}-check-icon`)

    expect(svgElement).toBeVisible()

    expect(svgElement).toHaveProp('width', 50)
    expect(svgElement).toHaveProp('height', 50)
  })

  it('should call onValueChange with true when pressed (unchecked to checked)', () => {
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

  it('should call onValueChange with false when pressed (checked to unchecked)', () => {
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
