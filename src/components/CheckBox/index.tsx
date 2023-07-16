import { FC } from 'react'
import { PressableProps, StyleSheet, TouchableHighlight } from 'react-native'
import { Check } from 'phosphor-react-native'

import { colors } from '@/styles'

interface CheckboxProps extends PressableProps {
  value?: boolean
  onValueChange?: (value: boolean) => void
  size?: number
}

export const CheckBox: FC<CheckboxProps> = ({
  value = false,
  size = 24,
  onValueChange,
  testID,
}) => {
  const borderColor = value ? colors['purple-dark'] : colors['blue-light']
  const backgroundColor = value ? colors['purple-dark'] : 'transparent'

  const showCheckIcon = value ? 1 : 0
  const iconSize = size / 1.5

  return (
    <TouchableHighlight
      style={[
        styles.container,
        {
          height: size,
          width: size,
          borderRadius: 9999,
          borderColor,
          backgroundColor,
        },
      ]}
      onPress={() => onValueChange?.(!value)}
      testID={testID}
    >
      <Check
        style={{ opacity: showCheckIcon }}
        color={colors['gray-100']}
        weight="bold"
        size={iconSize}
      />
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
