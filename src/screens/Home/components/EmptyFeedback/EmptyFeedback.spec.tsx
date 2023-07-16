import { render } from '@testing-library/react-native'
import { EmptyFeedback } from '.'

describe('EmptyFeedback Component', () => {
  it('should renderCorrectly', () => {
    render(<EmptyFeedback />)
  })
})
