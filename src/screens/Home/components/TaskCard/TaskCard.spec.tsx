import { fireEvent, render, screen } from '@testing-library/react-native'
import { TaskCard } from '.'
import { colors } from '@/styles'
import { CheckBox } from '@/components/CheckBox'

const task = {
  id: 'task-fake-1',
  description: 'Task description fake',
  done: false,
}
const rootTaskId = 'task-card'

jest.mock('@/components/CheckBox', () => ({
  CheckBox: jest.fn(),
}))

describe('TaskCard Component', () => {
  beforeEach(() => {
    jest.mocked(CheckBox).mockReset()
  })

  it('should render Correctly Unhecked', () => {
    render(<TaskCard testID={rootTaskId} task={task} />)

    const taskCard = screen.getByTestId('task-card')
    const text = screen.getByTestId(`${rootTaskId}-text`)

    expect(taskCard).toBeTruthy()
    expect(CheckBox).toHaveBeenCalledTimes(1)

    const CheckBoxMock = jest.mocked(CheckBox)
    const { value, onValueChange } = CheckBoxMock.mock.calls[0][0]

    expect(value).toBe(false)
    expect(onValueChange).toBeInstanceOf(Function)

    expect(text).toHaveTextContent(task.description)
    expect(text).toHaveStyle({
      color: colors['gray-100'],
      textDecorationLine: 'none',
      fontSize: 14,
      lineHeight: 20,
    })
  })

  it('should render Correctly Checked', () => {
    render(<TaskCard testID={rootTaskId} task={{ ...task, done: true }} />)

    const taskCard = screen.getByTestId('task-card')
    const text = screen.getByTestId(`${rootTaskId}-text`)

    expect(taskCard).toBeTruthy()
    expect(CheckBox).toHaveBeenCalledTimes(1)

    const CheckBoxMock = jest.mocked(CheckBox)
    const { value, onValueChange } = CheckBoxMock.mock.calls[0][0]

    expect(value).toBe(true)
    expect(onValueChange).toBeInstanceOf(Function)

    expect(text).toHaveTextContent(task.description)
    expect(text).toHaveStyle({
      color: colors['gray-300'],
      textDecorationLine: 'line-through',
      fontSize: 14,
      lineHeight: 20,
    })
  })

  it('should call function onCh passign the task id as argument', () => {
    const onClickDelete = jest.fn()

    render(
      <TaskCard
        testID={rootTaskId}
        task={task}
        onClickDelete={onClickDelete}
      />,
    )

    const btnDelete = screen.getByTestId(`${rootTaskId}-btn-delete`)

    fireEvent.press(btnDelete)

    expect(onClickDelete).toHaveBeenCalledTimes(1)
    expect(onClickDelete).toHaveBeenCalledWith(task.id)
  })

  it('should correctly and update the UI when call onValueChange callback', () => {
    jest
      .mocked(CheckBox)
      .mockImplementation(jest.requireActual('@/components/CheckBox').CheckBox)

    render(<TaskCard testID={rootTaskId} task={task} />)

    const text = screen.getByTestId(`${rootTaskId}-text`)

    const checkbox = screen.getByTestId(`${rootTaskId}-checkbox`)

    expect(text).toHaveStyle({
      color: colors['gray-100'],
      textDecorationLine: 'none',
    })

    fireEvent.press(checkbox)

    expect(text).toHaveStyle({
      color: colors['gray-300'],
      textDecorationLine: 'line-through',
    })

    fireEvent.press(checkbox)

    expect(text).toHaveStyle({
      color: colors['gray-100'],
      textDecorationLine: 'none',
    })
  })
})
