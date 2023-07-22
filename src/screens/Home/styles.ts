import { colors, fontFamily } from '@/styles'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 70,
    paddingHorizontal: 16,

    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerTall: {
    paddingTop: 70,
    paddingBottom: 70,
  },
  body: {
    position: 'relative',
    flex: 1,
    backgroundColor: colors['gray-600'],
    paddingHorizontal: 24,
  },
  inputRow: {
    position: 'absolute',
    top: 0,
    left: 24,

    transform: [{ translateY: -40 }],
    width: '100%',
    flexDirection: 'row',
    gap: 6,
    zIndex: 2,
    elevation: 40,
  },
  addButton: {
    paddingHorizontal: 16,
    backgroundColor: colors['blue-dark'],
    borderRadius: 6,

    alignContent: 'center',
    justifyContent: 'center',
  },

  summaryRow: {
    paddingTop: 50,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryBadge: { flexDirection: 'row', gap: 8 },
  summaryLabel: {
    fontFamily: fontFamily.InterBold,
  },
  summaryCounter: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999,
    fontSize: 12,
    backgroundColor: colors['gray-400'],
    color: colors['gray-200'],
    fontFamily: fontFamily.InterBold,
  },
})
