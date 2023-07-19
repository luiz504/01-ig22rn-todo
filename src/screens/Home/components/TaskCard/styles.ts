import { colors } from '@/styles'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 8,
    paddingVertical: 12,
    paddingLeft: 12,
    paddingRight: 8,
    borderWidth: 2,
    backgroundColor: colors['gray-500'],
  },
  containerLarger: {
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 12,
    gap: 16,
  },
  text: { fontSize: 14, lineHeight: 20, flex: 1 },

  btnDelete: {
    marginLeft: 'auto',
  },
})
