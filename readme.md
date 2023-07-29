![branches](__badges__/badge-branches.svg)
![functions](__badges__/badge-functions.svg)
![lines](__badges__/badge-lines.svg)
![statements](__badges__/badge-statements.svg)

# React-native TODO list study project

## Overview

This repository contains a Todo list app built as part of a React Native study project. The project was created during a bootcamp challenge, focusing on implementing essential features for a task management application. The main features include:

- Creating a UI based on the specified [layout](<https://www.figma.com/file/QLMPiDtg2WMpnp1u2BfQb3/ToDo-List-%E2%80%A2-Desafio-React-Native-(Copy)?node-id=401%3A499&mode=dev>).
- Adding tasks to the list and displaying the total number of tasks.
- Allowing users to update task statuses.
- Supporting task deletion from the list.
- Show amount of tasks created.
- Show amount of tasks completed.

### Additional features made to seize the opportunity to learn more

- Writing unit tests using various scenarios to gain proficiency in testing applications.
- Gaining insights into effective testing practices, including TDD (Test-Driven Development) principles and managing test coverage
- Implementing data persistence by using AsyncStorage to save tasks locally.
- Creating swipable cards with interactive actions using libraries like react-native-gesture-handler and react-native-reanimated.
- Implementing responsive design using the Dimension API to adapt components and styles based on different screen sizes.
- Creating a swipe left action on task cards for devices with a screen width of 768 or less. The swipe action reveals the delete button for a more intuitive user experience.

## Nice to have

- [ ] Edit task descriptions when its not completed.
- [ ] Sort list of tasks (By creation data & | by status)

## Utils Links

[Expo](https://docs.expo.dev/) Official documentation for Expo, a toolchain and platform for React Native development.

[Expo CLI](https://docs.expo.dev/more/expo-cli/#develop) Documentation for the Expo Command-Line Interface (CLI) for easier development with Expo.

[EAS Build](https://docs.expo.dev/build/introduction/) Documentation for EAS Build, which facilitates building APK files for Android devices from the project.

[Android Studio](https://developer.android.com/studio) Required for Android device emulation or using ADB to install the APK on a device.

[Environment React-Native Setup](https://react-native.rocketseat.dev/) A guide to setting up the React Native environment, provided by Rocketseat.

### Scripts

Use the following scripts to perform common tasks during development:

---

Starts the development server.

```bash
  npx expo start
```

---

Starts the development server with cache cleaning before starting.

```bash
  npx expo start -c
```

---

Builds an APK file for installation on an Android device (requires EAS Build).

```bash
eas build --platform android --profile preview-apk --local
```

---

## Studying Notes and insights

<details>
<summary>Styling</summary>

---

- During the development of the project, the primary choice for styling was the `StyleSheet` in React Native. However, some challenges were encountered when trying to apply certain styles, such as `transform: translationY 50%`, which is not supported in the same way as in web development. An attempt to use the `styled-components` library resulted in confusing compilation errors related to unsupported styles, leading to the decision to stick with `StyleSheet` for its simplicity.

- Notably, `transform: translateY` behaves differently in React Native compared to web environment, as it does not support using percentages for translating an element by half of its size, for example. Instead, React Native uses density-independent pixels as the size unit.

- The usage of `z-index` for overlapping elements required careful consideration of the element order to achieve the desired effect.

- React Native lacks built-in pseudo classes, making simple styling based on pseudo classes more cumbersome. Workarounds include using states, the Animated API, or libraries like `react-native-reanimated` with shared values.

- Implementing box shadows in React Native was found to have varying attributes between iOS and Android platforms. Despite following the official RN [Shadow Props documentation](https://reactnative.dev/docs/shadow-props) , issues persisted. While workarounds involving external libraries or outer boxes exist, the preference was to use borders instead to avoid unnecessary complexity.

- A remarkable point that I found different here is the way to deal with conditional styles, passing to styles an array of styles and the last valid style is applied or using logic operators on the jsx scope directly.

</details>

<details>
<summary>Swipable Card</summary>

---

The objective was to create a TaskCard with layout and behavior inspired by mobile app interfaces like Linked Job suggestion cards and Hotmail Email cards. The desired functionality included a swipe left action to reveal a delete button.

To achieve this feature, two libraries were explored: react-native-gesture-handler and react-native-reanimated.

- `react-native-gesture-handler`: This library is well-documented, but it lacks comprehensive sample code, making it challenging to understand how its components work together effectively. Additionally, there have been many versions with significant changes, and at the moment, Expo does not install the latest version.
- `react-native-reanimated`: The library provides hooks that offer a performance boost for animations by using a syntax sugar approach to ref usage. However, it's important to note that it may not be as reactive as other solutions.

</details>

<details>
<summary>Testing</summary>

- Testing was not mandatory for the challenge, but it provided an excellent opportunity to practice Test-Driven Development (TDD) principles.

- Adopting TDD, I diligently wrote meaningful tests whenever possible. This practice resulted in frequent test refactoring due to code splitting, refactoring, adding new features, and gaining a deeper understanding of unit tests.

- While testing offers valuable benefits, I also realized that attempting to test everything can be resource-intensive, increasing development time and maintenance efforts, especially when requirements are unclear and the code undergoes significant changes.

I- t's crucial to approach test coverage metrics with caution, as high coverage alone may not guarantee a flawlessly functioning application. A thoughtful evaluation of test quality and effectiveness is essential to ensure overall code reliability.

</details>

<details>
<summary>Splash Screen and Icons</summary>

- Replacing the splash screen was a straightforward task, but special attention was required to avoid image distortion.
- Icon and Adaptive has some considerations with the canvas and images sizes check this [Documentation](https://developer.android.com/develop/ui/views/launch/icon_design_adaptive).
- Some properties in the `app.json` config file were overwritten in development mode and only applied when building the app, like the adaptive-icon.
- The use of `eas build --local` lacked caching support, impacting build times during development.

</details>

</details>
