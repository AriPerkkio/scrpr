import puppeteer from 'puppeteer';
import knex from 'knex';

// Move to webpack conf. use process.env. Check for test env.
import secrets from '../../secrets.yml';
import cfStorage from '../../cf-storage.yml';

(async () => {
    try {
        const pg = knex({
            client: 'pg',
            connection: {
                host: cfStorage.DatabaseHost,
                user: secrets.DB_USER,
                password: secrets.DB_PASSWORD,
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
