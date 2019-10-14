import puppeteer from 'puppeteer';
import knex from 'knex';

(async () => {
    try {
        const pg = knex({
            client: 'pg',
            connection: {
                host: __DB_HOST__,
                user: __DB_USER__,
                password: __DB_PASSWORD__,
                database: 'scrpr_database',
                // TODO set higher timeout
            },
        });

        const browser = await puppeteer.launch({
            executablePath:
                './node_modules/puppeteer/.local-chromium/linux-686378/chrome-linux/chrome',
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        await page.goto('https://reactjs.org');

        const title = await page.title();
        const result = await pg('configurations')
            .limit(1)
            .first();

        console.log(`Title: ${title}, name: ${result.name}`);

        await browser.close();
        process.exit();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
