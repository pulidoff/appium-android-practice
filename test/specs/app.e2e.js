describe('WebdriverIO Native Demo App - Home screen', () => {
    it('should display the Login menu item on launch', async () => {
        const loginMenuItem = await $('~Login');

        await loginMenuItem.waitForDisplayed({ timeout: 10000 });

        await expect(loginMenuItem).toBeDisplayed();
    });
});
