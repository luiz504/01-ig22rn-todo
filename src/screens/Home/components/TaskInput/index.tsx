import { colors } from '@/styles'
import { ComponentProps, forwardRef, useState } from 'react'
import { Control, useController } from 'react-hook-form'
import { TextInput, StyleSheet } from 'react-native'

interface TaskInputProps extends ComponentProps<typeof TextInput> {
  control: Control<{ description: string }>
}

export const TaskInput = forwardRef<TextInput, TaskInputProps>(
  ({ control, defaultValue = '', onBlur, onFocus, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const { field } = useController({
      name: 'description',
      control,
      defaultValue,
    })

    return (
      <TextInput
        ref={ref}
        {...rest}
        onFocus={(e) => {
          setIsFocused(true)
          onFocus?.(e)
        }}
        onBlur={(e) => {
          setIsFocused(false)
          onBlur?.(e)
        }}
        value={field.value}
        onChangeText={(value) => field.onChange(value)}
        style={[styles.input, isFocused && styles.inputFocused]}
      />
    )
  },
)

const styles = StyleSheet.create({
  input: {
    flex: 1,
    backgroundColor: colors['gray-500'],
    fontSize: 16,
    color: colors['gray-100'],
    padding: 16,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors['gray-500'],
    borderStyle: 'solid',
  },
  inputFocused: {
    borderColor: colors['purple-dark'],
  },
})

TaskInput.displayName = 'TaskInput'
