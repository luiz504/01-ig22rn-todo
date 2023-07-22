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
    backgroundColor: colors['gray-500'],

    borderWidth: 2,
    borderColor: colors['gray-400'],
  },
  containerChecked: {
    borderColor: colors['gray-500'],
  },
  containerLarger: {
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 12,
    gap: 16,
  },
  text: { fontSize: 14, lineHeight: 20, flex: 1, color: colors['gray-100'] },
  textChecked: {
    color: colors['gray-300'],
    textDecorationLine: 'line-through',
  },
  btnDelete: {
    marginLeft: 'auto',
  },
})
