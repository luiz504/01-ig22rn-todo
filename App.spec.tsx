import { render, screen } from '@testing-library/react-native'

import * as SplashScreen from 'expo-splash-screen'

import App from './App'
import { StatusBar } from 'expo-status-bar'

import * as expoFont from 'expo-font'

jest.mock('expo-font')
jest.mock('expo-splash-screen')

describe('App Component', () => {
  const useFontsSpy = () => jest.spyOn(expoFont, 'useFonts')
  const useHideAsyncSpy = () => jest.spyOn(SplashScreen, 'hideAsync')

  beforeEach(() => {
    jest.useFakeTimers()
    jest.resetAllMocks()
  })
  it('should render null when no font is loaded', () => {
    useFontsSpy().mockReturnValue([false, null])

    render(<App />)

    expect(screen.queryByTestId('app-container')).toBeNull()
  })

  it('should render correctly with loaded fonts', () => {
    useFontsSpy().mockReturnValueOnce([true, null])

    render(<App />)

    expect(screen.getByTestId('app-container')).toBeTruthy()

    const statusBar = screen.UNSAFE_queryByType(StatusBar)
    expect(statusBar).toBeTruthy()
    expect(statusBar?.props.style).toBe('light')
    expect(statusBar?.props.backgroundColor).toBe('#0D0D0D')
    expect(statusBar?.props.translucent).toBe(false)
  })

  it('should call SplashScreen.hideAsync when fonts are loaded', async () => {
    useFontsSpy().mockReturnValueOnce([true, null])

    const hideAsyncSpy = useHideAsyncSpy()

    render(<App />)

    await screen.getByTestId('app-container').props.onLayout()

    expect(hideAsyncSpy).toHaveBeenCalledTimes(1)
  })

  it('should not call SplashScreen.hideAsync when fonts are not loaded', async () => {
    useFontsSpy().mockReturnValueOnce([false, null])
    const hideAsyncSpy = useHideAsyncSpy()

    render(<App />)

    expect(hideAsyncSpy).not.toHaveBeenCalled()
  })
})
