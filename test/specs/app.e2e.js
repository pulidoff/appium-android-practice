describe('WebdriverIO Native Demo App - Home screen', () => {
    it('should display the Login menu item on launch', async () => {
        await driver.saveScreenshot('./screenshots/01-app-launched.png');

        const loginMenuItem = await $('~Login');
        await loginMenuItem.waitForDisplayed({ timeout: 10000 });
        await driver.saveScreenshot('./screenshots/02-login-menu-visible.png');

        await expect(loginMenuItem).toBeDisplayed();
    });
});
