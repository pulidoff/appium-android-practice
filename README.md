# Appium Android Practice

Mobile test automation practice project built with **Appium** and **WebdriverIO** (JavaScript, Mocha test runner). It runs UI tests against the [WebdriverIO Native Demo App](https://github.com/webdriverio/native-demo-app) on an Android emulator, as a hands-on sample for a QA Automation portfolio.

## Tech stack

- [WebdriverIO](https://webdriver.io/) v9 (`@wdio/cli`, `@wdio/local-runner`)
- [Mocha](https://mochajs.org/) test framework (`@wdio/mocha-framework`)
- [Appium](https://appium.io/) v3 + `@wdio/appium-service` (auto-starts/stops the Appium server)
- Appium **UiAutomator2** driver for Android automation
- GitHub Actions for CI (runs tests on every push)

## Prerequisites

To run the tests locally you need:

- [Node.js](https://nodejs.org/) 18+ and npm
- [Java JDK](https://adoptium.net/) and the [Android SDK](https://developer.android.com/studio) (`ANDROID_HOME` configured)
- Appium and the UiAutomator2 driver:
  ```bash
  npm install -g appium
  appium driver install uiautomator2
  ```
- An Android emulator (this project targets a `Pixel_7_Pro`, API 33) with the [WebdriverIO Native Demo App](https://github.com/webdriverio/native-demo-app) (`com.wdiodemoapp`) already installed.

## Installation

```bash
git clone <this-repo-url>
cd appium-android-practice
npm install
```

## Running the tests

1. Start the Android emulator (e.g. via Android Studio's Device Manager or `emulator -avd Pixel_7_Pro`) and make sure the demo app is installed on it.
2. Run the test suite:
   ```bash
   npm test
   ```
   The `@wdio/appium-service` will automatically launch the Appium server on port `4723` before the run and shut it down afterwards, so there's no need to start Appium manually.

## Project structure

```
appium-android-practice/
├── .github/
│   └── workflows/
│       └── mobile-tests.yml   # CI: boots an Android emulator and runs the suite on every push
├── test/
│   └── specs/
│       └── app.e2e.js         # Sample test: verifies the home screen renders the "Login" menu item
├── wdio.conf.js               # WebdriverIO/Appium configuration (capabilities, services, framework)
├── package.json
└── README.md
```

## Continuous Integration

The workflow in `.github/workflows/mobile-tests.yml` runs on every push and pull request to `main`. It:

1. Installs npm dependencies and the Appium UiAutomator2 driver.
2. Downloads the WebdriverIO Native Demo App APK.
3. Boots an Android emulator (API 33) via [`reactivecircus/android-emulator-runner`](https://github.com/ReactiveCircus/android-emulator-runner).
4. Installs the app on the emulator and runs `npm test` against it.

## Notes

- `wdio.conf.js` uses `appium:noReset: true` and expects the app to already be installed locally (matching this project's local dev setup). In CI, an `APP_PATH` environment variable is set so Appium installs the downloaded APK on the fresh emulator before the session starts.
