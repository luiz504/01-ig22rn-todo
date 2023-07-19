import { fireEvent, render, screen } from '@testing-library/react-native'
import { TaskCard } from '.'
import { colors } from '@/styles'
import * as CheckBoxModule from '@/components/CheckBox'

const task = {
  id: 'task-fake-1',
  description: 'Task description fake',
  done: false,
}
const rootTaskId = 'task-card'

describe('TaskCard Component', () => {
  it('should render Correctly Unhecked', () => {
    const checkboxSpy = jest.spyOn(CheckBoxModule, 'CheckBox')
    render(<TaskCard testID={rootTaskId} task={task} />)

    const taskCard = screen.getByTestId('task-card')
    const text = screen.getByTestId(`${rootTaskId}-text`)

    expect(taskCard).toBeTruthy()

    expect(checkboxSpy).toHaveBeenCalledTimes(1)
    const { value, onValueChange } = checkboxSpy.mock.calls[0][0]

    expect(value).toBe(false)
    expect(onValueChange).toBeInstanceOf(Function)

    expect(text).toHaveTextContent(task.description)
    expect(text).toHaveStyle({
      color: colors['gray-100'],
      textDecorationLine: 'none',
      fontSize: 14,
      lineHeight: 20,
    })

    checkboxSpy.mockRestore()
  })

  it('should render Correctly Checked', () => {
    const checkboxSpy = jest.spyOn(CheckBoxModule, 'CheckBox')

    render(<TaskCard testID={rootTaskId} task={{ ...task, done: true }} />)

    const taskCard = screen.getByTestId('task-card')
    const text = screen.getByTestId(`${rootTaskId}-text`)

    expect(taskCard).toBeTruthy()

    expect(checkboxSpy).toHaveBeenCalledTimes(1)
    const { value, onValueChange } = checkboxSpy.mock.calls[0][0]

    expect(value).toBe(true)
    expect(onValueChange).toBeInstanceOf(Function)

    expect(text).toHaveTextContent(task.description)
    expect(text).toHaveStyle({
      color: colors['gray-300'],
      textDecorationLine: 'line-through',
      fontSize: 14,
      lineHeight: 20,
    })

    checkboxSpy.mockRestore()
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

  it('should call onClickCheck callback passing the correct arguments', () => {
    const onClickCheckMocked = jest.fn()

    render(
      <TaskCard
        testID={rootTaskId}
        task={task}
        onClickCheck={onClickCheckMocked}
      />,
    )

    const text = screen.getByTestId(`${rootTaskId}-text`)

    const checkbox = screen.getByTestId(`${rootTaskId}-checkbox`)

    expect(text).toHaveStyle({
      color: colors['gray-100'],
      textDecorationLine: 'none',
    })

    fireEvent.press(checkbox)

    expect(onClickCheckMocked).toHaveBeenCalledTimes(1)
    expect(onClickCheckMocked).toHaveBeenCalledWith(task.id, !task.done)
  })

  it('should call  onClickDelete callback passing the correct arguments', () => {
    const onClickDeleteMocked = jest.fn()

    render(
      <TaskCard
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
