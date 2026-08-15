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
    connectionRetryCount: 5,

    //
    // Services
    // Starts and stops the Appium server automatically before/after the test run.
    services: [
        ['appium', {
            command: 'appium',
            args: {
                // Bind explicitly to the IPv4 loopback address instead of
                // 'localhost': some CI runners resolve 'localhost' to the
                // IPv6 loopback first, which causes WebdriverIO's initial
                // connection to fail with ECONNREFUSED even though Appium
                // is up and listening on 127.0.0.1.
                address: '127.0.0.1',
                port: 4723
            },
            // Appium can take well over the 30s default to boot in CI
            // (loading the UiAutomator2 driver on a cold cache, shared
            // runner CPU, etc). Give it more headroom before the service
            // gives up waiting for the "listener started" log line.
            appiumStartTimeout: 150000
        }]
    ],
    hostname: '127.0.0.1',
    port: 4723,

    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
