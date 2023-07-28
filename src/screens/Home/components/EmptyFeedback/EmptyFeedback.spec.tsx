import { render, screen } from '@testing-library/react-native'
import { EmptyFeedback } from '.'

describe('EmptyFeedback Component', () => {
  it('should render correctly', () => {
    const rootTestId = 'empty-feedback'
    render(<EmptyFeedback testID={rootTestId} />)

    expect(screen.getByTestId(`${rootTestId}`)).toBeTruthy()
    expect(screen.getByTestId(`${rootTestId}-heading`)).toBeTruthy()
    expect(screen.getByTestId(`${rootTestId}-span`)).toBeTruthy()
  })
})
