/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-var-requires */

import '@testing-library/jest-native/extend-expect'

// async-storage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
)

// react-native-reanimated
require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests()
global.__reanimatedWorkletInit = () => {}

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
)
