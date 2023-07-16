import { colors } from '@/styles'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 8,
    paddingVertical: 12,
    paddingLeft: 12,
    paddingRight: 8,
    backgroundColor: colors['gray-400'],
    borderRadius: 8,
  },

  text: { fontSize: 14, lineHeight: 20, flex: 1 },

  btnDelete: {
    marginLeft: 'auto',
  },
})
