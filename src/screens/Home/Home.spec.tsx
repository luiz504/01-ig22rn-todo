import { render, screen } from '@testing-library/react-native'

import { Home } from '.'
import { colors } from '@/styles'

describe('Home Component', () => {
  it('should render correctly', () => {
    render(<Home />)

    expect(screen.getByTestId('screen-container')).toBeTruthy()
    expect(screen.getByTestId('logo')).toBeTruthy()

    const inputElement = screen.getByPlaceholderText('Add a new task')

    expect(inputElement).toBeTruthy()
    expect(inputElement.props.placeholderTextColor).toEqual(colors['gray-300'])

    expect(screen.getByTestId('input')).toBeTruthy()
  })
})
