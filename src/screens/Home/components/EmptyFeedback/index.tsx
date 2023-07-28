import { FC } from 'react'
import { Text, View } from 'react-native'

import { styles } from './styles'
import Clipboard from '@assets/clipboard.svg'

export const EmptyFeedback: FC<{ testID?: string }> = ({ testID }) => {
  const texts = {
    title: "You already don't have tasks created yet",
    subTitle: 'Create tasks and organize your Todos',
  }
  return (
    <View style={styles.container} testID={testID}>
      <Clipboard />
      <Text testID={`${testID}-heading`} style={styles.heading}>
        {texts.title}
      </Text>
      <Text testID={`${testID}-span`} style={styles.span}>
        {texts.subTitle}
      </Text>
    </View>
  )
}
