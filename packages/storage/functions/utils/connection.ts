import knex from 'knex';

const pg = knex({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'scrpr_database',
    },
});

export const waitForConnection = async (): Promise<knex> => {
    let retries = 0;

    while (retries < 30) {
        try {
            await pg.raw("SELECT 'test connection';");
            process.stdout.write('\n');

            return pg;
        } catch (e) {
            retries++;
            retries === 1 && process.stdout.write('Retrying connection');
            process.stdout.write('.');

            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    throw new Error('Unable to connect to database');
};
