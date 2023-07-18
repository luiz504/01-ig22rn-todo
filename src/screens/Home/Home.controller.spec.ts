import { act, renderHook, waitFor } from '@testing-library/react-native'
import { Task, useHomeController } from './controller'

describe('useHomeController Hook', () => {
  it('should add a new task on form submission', async () => {
    const { result } = renderHook(() => useHomeController())

    const oldTaskLength = result.current.tasks.length

    const newTaskDescription = 'New Task 1'
    await act(async () => {
      result.current.setValue?.('description', newTaskDescription)
      result.current.onSubmit()
      await Promise.resolve() // wait async state updates
    })
    const lastTaskIndex = result.current.tasks.length - 1

    expect(result.current.tasks.length).toBe(oldTaskLength + 1)
    expect(result.current.tasks[lastTaskIndex].description).toBe(
      newTaskDescription,
    )
    expect(result.current.tasks[lastTaskIndex].done).toBe(false)
  })

  it('should delete an task correctly', async () => {
    const { result } = renderHook(() => useHomeController())

    const initialTasks: Task[] = [
      { id: 'task1', description: 'Task 1', done: false },
    ]

    result.current.setTasks?.(initialTasks)
    expect(result.current.tasks).toHaveLength(1)

    act(() => {
      result.current.handleDeleteTask(initialTasks[0].id)
    })

    await waitFor(() => {
      expect(result.current.tasks).toHaveLength(0)
    })
  })
})
