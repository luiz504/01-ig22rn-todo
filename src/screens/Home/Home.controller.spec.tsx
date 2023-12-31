import React, { FC, MutableRefObject, ReactNode } from 'react'
import { TextInput } from 'react-native'
import { act, renderHook, waitFor } from '@testing-library/react-native'
import { TasksContext } from '@/context/tasksContext'
import { QueryClientProvider } from '@tanstack/react-query'
import { useController } from 'react-hook-form'

import { useHomeController } from './controller'
import { queryClientTest } from '__mocks__/queryClient'

jest.mock('react-hook-form', () => {
  const original = jest.requireActual('react-hook-form')

  return {
    ...original,
    useForm: () => {
      return {
        ...original.useForm(),
        setValue: jest.fn(),
      }
    },
  }
})
describe('useHomeController Hook', () => {
  const handleCreateTaskMocked = jest.fn()

  const Wrapper: FC<{ children: ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClientTest}>
      <TasksContext.Provider
        value={{ handleCreateTask: handleCreateTaskMocked } as any}
      >
        {children}
      </TasksContext.Provider>
    </QueryClientProvider>
  )

  const renderHookWithWrapper = () =>
    renderHook(() => useHomeController(), {
      wrapper: Wrapper,
    })

  it('should call "handleCreateTask" with the input value when "onSubmit" is called', async () => {
    const { result } = renderHookWithWrapper()

    // Wait for Async hook finishes rendering
    await waitFor(() => expect(result).not.toBeNull())

    const setValueSpy = jest.spyOn(result.current, 'setValue')

    const inputRef = result.current
      .inputRef as MutableRefObject<TextInput | null>

    inputRef.current = { blur: jest.fn() } as any

    const { result: useControllerResult } = renderHook(() =>
      useController({
        name: 'description',
        control: result.current.control,
      }),
    )

    const taskName = 'task Fake 42'
    act(() => {
      useControllerResult.current.field.onChange(taskName)
    })

    await waitFor(async () => {
      act(() => {
        result.current.onSubmit()
      })
    })

    expect(inputRef.current?.blur).toBeCalledTimes(1)
    expect(handleCreateTaskMocked).toHaveBeenCalledWith({
      description: taskName,
    })
    expect(setValueSpy).toHaveBeenCalled()
  })
})
