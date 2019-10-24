import knex from 'knex';

import { createConfigurations } from '../functions/InitializeDatabase/create-tables';

const pg = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'test-user',
        password: 'test-setup-password',
        database: 'test_database',
    },
});

const waitForConnection = async (): Promise<void> => {
    let retries = 0;

    while (retries < 30) {
        try {
            await pg.raw("SELECT 'test connection';");
            process.stdout.write('\n');

            return;
        } catch (e) {
            retries++;
            retries === 1 && process.stdout.write('Retrying connection');
            process.stdout.write('.');

            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    throw new Error('Unable to connect to database');
};

(async () => {
    try {
        await waitForConnection();
        await createConfigurations(pg.schema);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }

    process.exit();
})();
