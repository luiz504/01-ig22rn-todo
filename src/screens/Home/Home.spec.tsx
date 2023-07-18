import { render, screen } from '@testing-library/react-native'

import { Home } from '.'

import React from 'react'
import { useHomeController } from './controller'

jest.mock('./controller')
jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useController: jest
    .fn()
    .mockReturnValue({ field: { onChange: jest.fn() } as any } as any),
}))

describe('Test With No Mocks', () => {
  describe('Tests with mocked modules', () => {
    it('should render the TaskCard Correctly', () => {
      jest.mocked(useHomeController).mockReturnValue({
        control: {} as any,
        handleSubmit: jest.fn(),
        tasks: [],
      } as any)
      render(<Home />)

      expect(screen.getByTestId('empty-feedback')).toBeTruthy()
      expect(screen.queryByTestId('task-card')).not.toBeTruthy()
    })

    it('should render the TasksCard related with tasks variable', () => {
      jest.mocked(useHomeController).mockReturnValue({
        control: {} as any,
        handleSubmit: jest.fn(),
        tasks: [
          { id: 't1', description: 'Task Fake 1', done: true },
          { id: 't2', description: 'Task Fake 2', done: false },
        ],
      } as any)
      render(<Home />)

      expect(screen.queryByTestId('empty-feedback')).not.toBeTruthy()
      expect(screen.getAllByTestId('task-card')).toHaveLength(2)
      expect(screen.getAllByText('Task Fake 1')).toHaveLength(1)
      expect(screen.getAllByText('Task Fake 2')).toHaveLength(1)
    })
  })

  describe('Test with pure modules', () => {
    beforeAll(() => {
      jest.resetModules()
    })
    it('should render correctly', () => {
      render(<Home />)

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
})
