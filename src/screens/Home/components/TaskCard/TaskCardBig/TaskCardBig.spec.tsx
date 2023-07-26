import { fireEvent, render, screen } from '@testing-library/react-native'
import { TaskCardBig } from '.'
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
    render(<TaskCardBig testID={rootTaskId} task={task} />)

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

    render(<TaskCardBig testID={rootTaskId} task={{ ...task, done: true }} />)

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
      <TaskCardBig
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

  it('should call  onClickDelete callback passing the correct arguments', () => {
    const onClickDeleteMocked = jest.fn()

    render(
      <TaskCardBig
        testID={rootTaskId}
        task={task}
        onClickDelete={onClickDeleteMocked}
      />,
    )
    const btnDelete = screen.getByTestId(`${rootTaskId}-btn-delete`)

    fireEvent.press(btnDelete)

    expect(onClickDeleteMocked).toBeCalledTimes(1)
    expect(onClickDeleteMocked).toHaveBeenCalledWith(task.id)
  })
})
