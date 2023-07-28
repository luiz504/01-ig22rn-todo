import React, { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

import { Home } from './src/screens/Home'
import { colors } from './src/styles/colors'

import { queryClient } from '@/libs/queryClient'
import { TasksContextProvider } from '@/context/tasksContext'

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
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView
        testID="app-container"
        style={styles.container}
        onLayout={onLayoutHRootView}
      >
        <StatusBar
          style="light"
          backgroundColor={colors['gray-700']}
          translucent={false}
        />
        <TasksContextProvider>
          <Home />
        </TasksContextProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors['gray-700'],
    flex: 1,
    overflow: 'hidden',
  },
})
