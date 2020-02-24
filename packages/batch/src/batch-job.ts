import puppeteer from 'puppeteer';

import { waitForConnection } from 'scrpr-storage/functions/utils/connection';
import { Configuration } from 'scrpr-api/types/schema';

const executablePath =
    __PUPPETEER_PATH__ +
    '/node_modules/puppeteer/.local-chromium/linux-686378/chrome-linux/chrome';

(async () => {
    try {
        const pg = await waitForConnection();

        const browser = await puppeteer.launch({
            executablePath,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        const configurations: Configuration[] = await pg('configurations');

        for (let configuration of configurations) {
            const { url, name } = configuration;
            await page.goto(url);

            const title = await page.title();
            console.log({ name, title });
        }

        await browser.close();
        process.exit();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
