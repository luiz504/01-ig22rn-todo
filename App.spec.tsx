import { render, screen } from '@testing-library/react-native'

import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

import App from './App'
import { StatusBar } from 'expo-status-bar'

jest.mock('expo-font')
jest.mock('expo-splash-screen')

const useFontsMocked = jest.mocked(useFonts)
const hideAsyncMocked = jest.mocked(SplashScreen.hideAsync)

describe('App Component', () => {
  it('should return null when no font is loaded', () => {
    useFontsMocked.mockReturnValueOnce([false, null])
    render(<App />)

    expect(screen.queryByTestId('app-container')).toBeNull()
  })

  it('should render correctly when fonts loaded', () => {
    useFontsMocked.mockReturnValueOnce([true, null])
    render(<App />)
    expect(screen.getByTestId('app-container')).toBeTruthy()
    const statusBar = screen.UNSAFE_queryByType(StatusBar)

    expect(statusBar).toBeTruthy()
    expect(statusBar?.props.style).toBe('light')
    expect(statusBar?.props.backgroundColor).toBe('#0D0D0D')
    expect(statusBar?.props.translucent).toBe(false)
  })

  it('should call SplashScreen.hideAsync when fonts are loaded', async () => {
    useFontsMocked.mockReturnValueOnce([true, null])
    hideAsyncMocked.mockResolvedValueOnce(true)
    render(<App />)

    await screen.getByTestId('app-container').props.onLayout()
    expect(hideAsyncMocked).toHaveBeenCalledTimes(1)
    hideAsyncMocked.mockRestore()
  })
  it('should not call SplashScreen.hideAsync when fonts are not loaded', async () => {
    useFontsMocked.mockReturnValueOnce([false, null])
    hideAsyncMocked.mockResolvedValueOnce(true)
    render(<App />)
    expect(hideAsyncMocked).not.toHaveBeenCalled()
  })
})
