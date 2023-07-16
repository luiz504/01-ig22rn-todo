import { render } from '@testing-library/react-native'
import { TaskCard } from '.'

describe('TaskCard Component', () => {
  it('should ', () => {
    render(
      <TaskCard
        task={{ id: 'e123', description: 'Hello moto', done: false }}
      />,
    )
  })
})
