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

(async () => {
    console.log('START');
    await createConfigurations(pg.schema);
    console.log('DONE');

    process.exit();
})();
