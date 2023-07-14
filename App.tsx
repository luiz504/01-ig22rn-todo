import { StatusBar } from 'expo-status-bar'

import { Home } from './src/screens/Home'
import { SafeAreaView, StyleSheet } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { useCallback } from 'react'
import { colors } from './src/styles/colors'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
  })

  const onLayoutHRootView = useCallback(async () => {
    await SplashScreen.hideAsync()
  }, [])

  if (!fontsLoaded) return null

  return (
    <SafeAreaView
      testID="app-container"
      style={styles.container}
      onLayout={onLayoutHRootView}
    >
      <StatusBar
        style="light"
        backgroundColor={colors['gray-700']}
        translucent={false}
      />
      <Home />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors['gray-700'],
    flex: 1,
  },
})
