import { fireEvent, render, screen } from '@testing-library/react-native'
import { TaskCardSmall } from '.'
import * as CheckBoxModule from '@/components/CheckBox'

import { styles } from '../styles'

const task = {
  id: 'task-fake-1',
  description: 'Task description fake',
  done: false,
}
const rootTaskId = 'task-card'

describe('TaskCard Component', () => {
  it('should render Correctly Unchecked', () => {
    const checkboxSpy = jest.spyOn(CheckBoxModule, 'CheckBox')
    render(<TaskCardSmall testID={rootTaskId} task={task} />)

    const taskCard = screen.getByTestId(`${rootTaskId}`)
    const text = screen.getByTestId(`${rootTaskId}-text`)

    expect(taskCard).toBeTruthy()

    expect(checkboxSpy).toHaveBeenCalledTimes(1)
    const { value, onValueChange } = checkboxSpy.mock.calls[0][0]

    expect(value).toBe(false)
    expect(onValueChange).toBeInstanceOf(Function)

    expect(text).toHaveTextContent(task.description)
    expect(text).toHaveStyle(styles.text)

    checkboxSpy.mockRestore()
  })

  it('should render Correctly Checked', () => {
    const checkboxSpy = jest.spyOn(CheckBoxModule, 'CheckBox')

    render(<TaskCardSmall testID={rootTaskId} task={{ ...task, done: true }} />)

    const taskCard = screen.getByTestId(`${rootTaskId}`)
    const text = screen.getByTestId(`${rootTaskId}-text`)

    expect(taskCard).toBeTruthy()

    expect(checkboxSpy).toHaveBeenCalledTimes(1)
    const { value, onValueChange } = checkboxSpy.mock.calls[0][0]

    expect(value).toBe(true)
    expect(onValueChange).toBeInstanceOf(Function)

    expect(text).toHaveTextContent(task.description)
    expect(text).toHaveStyle(styles.textChecked)

    checkboxSpy.mockRestore()
  })

  it('should call onClickCheck callback passing the correct arguments', () => {
    const onClickCheckMocked = jest.fn()

    render(
      <TaskCardSmall
        testID={rootTaskId}
        task={task}
        onClickCheck={onClickCheckMocked}
      />,
    )

    const checkbox = screen.getByTestId(`${rootTaskId}-checkbox`)

    fireEvent.press(checkbox)

    expect(onClickCheckMocked).toHaveBeenCalledTimes(1)
    expect(onClickCheckMocked).toHaveBeenCalledWith(task.id, !task.done)
  })

  it('should call onClickDelete with the correct task id when delete button is pressed', async () => {
    const onClickDeleteMock = jest.fn()

    render(
      <TaskCardSmall
        task={task}
        testID={rootTaskId}
        onClickDelete={onClickDeleteMock}
      />,
    )

    // Find the delete button and press it
    const deleteButton = screen.getByTestId(`${rootTaskId}-btn-delete`)

    fireEvent.press(deleteButton)

    // Check if onClickDeleteMock was called with the correct task id
    expect(onClickDeleteMock).toHaveBeenCalledTimes(1)
    expect(onClickDeleteMock).toHaveBeenCalledWith(task.id)
  })
})
