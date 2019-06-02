const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

async function getScreenshot(url) {
    const browser = await puppeteer.launch({
        args: [...chrome.args, '--font-render-hinting=medium'],
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
    });

    const page = await browser.newPage();
    page.setViewport({
        width: 1368,
        height: 768,
        isLandscape: true
    });
    await page.goto(url);
    const file = await page.screenshot({
        type: 'png',
        fullPage: true
    });
    await browser.close();
    return file;
}

module.exports = { getScreenshot };
