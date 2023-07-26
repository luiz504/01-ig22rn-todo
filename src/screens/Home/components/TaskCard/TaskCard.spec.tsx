import { render, screen } from '@testing-library/react-native'
import { Dimensions } from 'react-native'
import { TaskCard } from '.'
import { Task } from '@/hooks/useTasksQueries'

import * as TC from '@/context/tasksContext'
describe('TaskCard Component', () => {
  const useDimensionApiSpyMock = (width: number) =>
    jest.spyOn(Dimensions, 'get').mockReturnValueOnce({ width } as any)

  const task: Task = {
    id: 'string',
    description: 'fake description',
    done: false,
  }

  const testIdRoot = 'taskCardRootId'

  jest.spyOn(TC, 'useTasksContext').mockReturnValue({
    handleDeleteTask: jest.fn(),
    handleUpdateTaskStatus: jest.fn(),
  } as any)

  it('should render TaskCardSmall when screen width is under 768', () => {
    useDimensionApiSpyMock(767)

    render(<TaskCard testID={`${testIdRoot}-small`} task={task} />)

    expect(screen.getByTestId(`${testIdRoot}-small`)).toBeTruthy()
  })

  it('should render TaskCardBig component when the screen is equal or greater than 768', () => {
    useDimensionApiSpyMock(768)

    render(<TaskCard testID={`${testIdRoot}-big`} task={task} />)

    expect(screen.getByTestId(`${testIdRoot}-big`)).toBeTruthy()
  })
})
