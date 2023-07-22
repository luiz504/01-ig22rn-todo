import { Home } from '.'
import React, { FC, ReactNode } from 'react'
import { render, screen } from '@testing-library/react-native'
import { QueryClientProvider } from '@tanstack/react-query'

import { queryClientTest } from '@/libs/queryClient'
import { TasksContextProvider } from '@/context/tasksContext'

describe('Home Component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  const TestWrapper: FC<{ children: ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClientTest}>
      <TasksContextProvider>{children}</TasksContextProvider>
    </QueryClientProvider>
  )

  it('should render correctly - container - logo - input - submit-btn', () => {
    render(<Home />, { wrapper: TestWrapper })

    const containerElement = screen.getByTestId('screen-container')
    const logoElement = screen.getByTestId('logo')
    const inputElement = screen.getByPlaceholderText('Add a new task')
    const submitButtonElement = screen.getByTestId('submit-button')

    expect(containerElement).toBeTruthy()
    expect(logoElement).toBeTruthy()
    expect(inputElement).toBeTruthy()
    expect(submitButtonElement).toBeTruthy()
  })
})
