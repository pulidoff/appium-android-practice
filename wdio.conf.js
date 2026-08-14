exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',

    //
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [],

    //
    // ============
    // Capabilities
    // ============
    // Run tests against the WebdriverIO Native Demo App already installed on the
    // Pixel_7_Pro (API 33) emulator, using the UiAutomator2 driver.
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Pixel_7_Pro',
        'appium:platformVersion': '13',
        'appium:automationName': 'UiAutomator2',
        'appium:appPackage': 'com.wdiodemoapp',
        'appium:appActivity': '.MainActivity',
        'appium:noReset': true,
        // When APP_PATH is set (e.g. in CI, where the app isn't pre-installed
        // on the emulator), Appium installs the APK before the session starts.
        ...(process.env.APP_PATH ? { 'appium:app': process.env.APP_PATH } : {})
    }],

    //
    // ===================
    // Test Configurations
    // ===================
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    //
    // Services
    // Starts and stops the Appium server automatically before/after the test run.
    services: [
        ['appium', {
            command: 'appium',
            args: {
                address: 'localhost',
                port: 4723
            }
        }]
    ],
    port: 4723,

    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
