import knex from 'knex';

const getEnvKey = (
    productionVariable: string | undefined,
    testVariable: string
): string | undefined => {
    if (process.env.NODE_ENV === 'development') {
        return testVariable;
    }

    return productionVariable;
};

const pg = knex({
    client: 'pg',
    connection: {
        user: getEnvKey(process.env.DB_USER, 'test-user'),
        password: getEnvKey(process.env.DB_PASSWORD, 'test-setup-password'),
        host: getEnvKey(process.env.DB_HOST, 'localhost'),
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
