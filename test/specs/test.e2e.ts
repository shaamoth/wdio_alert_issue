import { Key } from 'webdriverio';
import { browser, $ } from '@wdio/globals'

describe('Alert test', () => {

    before(async () => {
        await browser.url(`${process.cwd()}/index.html`);
    })

    it('alert test - click', async () => {
        await $('#alertBtn').click();
        // Alert remains open
        await browser.pause(5000);
        const alertText = await browser.getAlertText();
        console.log(`Alert text is "${alertText}"`); // output: Alert text is "Click me button pressed"
        await browser.acceptAlert();
        await expect(alertText).toBe('Click me button pressed');
        // Passing
    })

    it('alert test - keyboard', async () => {
        await $('#focusBtn').click();
        await browser.keys(Key.Tab);
        await browser.pause(1000);
        await browser.keys(Key.Enter);
        // Alert is open and closes immediately
        await browser.pause(5000);
        const alertText = await browser.getAlertText(); // Failing - no such alert
        console.log(`Alert text is ${alertText}`);
        await browser.acceptAlert();
        await expect(alertText).toBe('Click me button pressed');
    })
})

