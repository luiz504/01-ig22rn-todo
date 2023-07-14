import { render, screen } from '@testing-library/react-native'
import { Home } from '.'

describe('Home Component', () => {
  it('should render correctly', () => {
    render(<Home />)

    expect(screen.getByText('Home')).toBeTruthy()
  })
})
