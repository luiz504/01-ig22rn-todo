import { FC } from 'react'
import { PressableProps, StyleSheet, TouchableOpacity } from 'react-native'
import { Check } from 'phosphor-react-native'

import { colors } from '@/styles'

interface CheckboxProps extends PressableProps {
  value: boolean
  onValueChange: (value: boolean) => void
  size?: number
}

export const CheckBox: FC<CheckboxProps> = ({
  value: isChecked,
  size = 24,
  onValueChange,
  testID,
}) => {
  const showCheckIcon = isChecked ? 1 : 0
  const iconSize = size / 1.5

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isChecked && styles.containerChecked,
        {
          height: size,
          width: size,
        },
      ]}
      onPress={() => onValueChange?.(!isChecked)}
      testID={testID}
    >
      <Check
        style={{ opacity: showCheckIcon }}
        color={colors['gray-100']}
        weight="bold"
        size={iconSize}
      />
    </TouchableOpacity>
  )
}

export const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',

    borderColor: colors['blue-light'],
    backgroundColor: 'transparent',
  },
  containerChecked: {
    borderColor: colors['purple-dark'],
    backgroundColor: colors['purple-dark'],
  },
})
