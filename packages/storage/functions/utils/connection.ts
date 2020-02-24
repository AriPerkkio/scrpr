import knex from 'knex';

const connection = {
    user: process.env.DB_USER || 'test-user',
    password: process.env.DB_PASSWORD || 'test-setup-password',
    host: process.env.DB_HOST || 'localhost',
    database: 'scrpr_database',
};

const pg = knex({ client: 'pg', connection });

export const waitForConnection = async (maxRetries = 30): Promise<knex> => {
    let retries = 0;
    console.log(`Connecting to ${JSON.stringify(connection, null, 2)}`);

    while (retries < maxRetries) {
        try {
            await pg.raw("SELECT 'test connection';");
            process.stdout.write('\n');

            return pg;
        } catch (e) {
            retries++;
            retries === 1 && process.stdout.write('Retrying connection');
            process.stdout.write('.');

            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    throw new Error('Unable to connect to database');
};
