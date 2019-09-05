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

export const hello = async (): Promise<string> => {
    try {
        const result = await pg('hello_world')
            .select('text')
            .first();

        return result.text;
    } catch (e) {
        console.log('Error', e);
        return `Error, ${e}`;
    }
};
