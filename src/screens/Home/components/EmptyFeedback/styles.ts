import { colors, fontFamily } from '@/styles'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    borderTopColor: colors['gray-400'],
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 48,

    alignItems: 'center',
  },

  heading: {
    marginTop: 16,
    fontFamily: fontFamily.InterBold,
    color: colors['gray-300'],
  },
  span: {
    fontFamily: fontFamily.InterRegular,
    color: colors['gray-300'],
  },
})
