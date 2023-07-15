import { FC } from 'react'
import { Text, View } from 'react-native'

import { styles } from './styles'
import Cliboard from '@assets/clipboard.svg'

export const EmptyFeedback: FC = () => {
  const texts = {
    title: "You already don't have tasks created yet",
    subTitle: 'Create tasks and organize your todos',
  }
  return (
    <View style={styles.container}>
      <Cliboard />
      <Text style={styles.heading}>{texts.title}</Text>
      <Text style={styles.span}>{texts.subTitle}</Text>
    </View>
  )
}
