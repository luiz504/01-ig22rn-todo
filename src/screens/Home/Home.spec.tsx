import { Home } from '.'
import React, { FC, ReactNode } from 'react'
import { render, screen } from '@testing-library/react-native'
import { QueryClientProvider } from '@tanstack/react-query'

import { TasksContextProvider } from '@/context/tasksContext'
import { queryClientTest } from '__mocks__/queryClient'
import * as TQ from '@/hooks/useTasksQueries'

describe('Home Component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  const useUseTasksStoreSpy = () => jest.spyOn(TQ, 'useTasksQueries')

  const tasksInitial: TQ.Task[] = [
    { id: 't1', description: 'T1 description', done: false },
    { id: 't2', description: 'T2 description', done: true },
  ]

  const Wrapper: FC<{ children: ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClientTest}>
      <TasksContextProvider>{children}</TasksContextProvider>
    </QueryClientProvider>
  )

  it('should render correctly - container - logo - input - submit-btn', () => {
    render(<Home />, { wrapper: Wrapper })

    const containerElement = screen.getByTestId('screen-container')
    const logoElement = screen.getByTestId('logo')
    const inputElement = screen.getByPlaceholderText('Add a new task')
    const submitButtonElement = screen.getByTestId('submit-button')

    expect(containerElement).toBeTruthy()
    expect(logoElement).toBeTruthy()
    expect(inputElement).toBeTruthy()
    expect(submitButtonElement).toBeTruthy()
  })
  it('should render correctly the taskCardList', async () => {
    useUseTasksStoreSpy().mockReturnValueOnce({
      tasksQuery: { data: tasksInitial },
      addTaskMutation: { isLoading: false, mutateAsync: jest.fn() },
      deleteTaskMutation: {
        isLoading: false,
        mutateAsync: jest.fn(),
      },
      updateTaskStatusMutation: {
        isLoading: false,
        mutateAsync: jest.fn(),
      },
    } as any)
    render(<Home />, { wrapper: Wrapper })

    expect(screen.getAllByTestId('task-card')).toHaveLength(2)
    expect(screen.getByText(tasksInitial[0].description)).toBeTruthy()
    expect(screen.getByText(tasksInitial[1].description)).toBeTruthy()
    expect(screen.queryByTestId('empty-feedback')).not.toBeTruthy()
  })
  it('should render correctly the Empty Feedback', async () => {
    useUseTasksStoreSpy().mockReturnValueOnce({
      tasksQuery: { data: [] },
      addTaskMutation: { isLoading: false, mutateAsync: jest.fn() },
      deleteTaskMutation: {
        isLoading: false,
        mutateAsync: jest.fn(),
      },
      updateTaskStatusMutation: {
        isLoading: false,
        mutateAsync: jest.fn(),
      },
    } as any)
    render(<Home />, { wrapper: Wrapper })

    expect(screen.getByTestId('empty-feedback')).toBeTruthy()
    expect(screen.queryByTestId('task-card')).not.toBeTruthy()
  })
})
