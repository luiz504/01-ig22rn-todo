import { render, screen } from '@testing-library/react-native'

import Logo from '@assets/logo-full.svg'

import { Home } from '.'
import { colors } from '@/styles'

describe('Home Component', () => {
  it('should render correctly', () => {
    render(<Home />)

    expect(screen.getByTestId('screen-container')).toBeTruthy()
    expect(screen.UNSAFE_getByType(Logo)).toBeTruthy()

    const inputElement = screen.getByPlaceholderText('Add a new task')

    expect(inputElement).toBeTruthy()
    expect(inputElement.props.placeholderTextColor).toEqual(colors['gray-300'])

    expect(screen.getByTestId('input')).toBeTruthy()
    screen.debug()
  })
})
