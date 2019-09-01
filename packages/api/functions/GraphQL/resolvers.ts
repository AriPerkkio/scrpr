import knex from 'knex';

const pg = knex({
    client: 'pg',
    connection: {
        host: '',
        user: '',
        password: '',
        database: '',
    },
    searchPath: ['knex', 'public'],
});

export const hello = async (): Promise<string> => {
    try {
        const result = await pg('hello_world')
            .withSchema('public')
            .select('text')
            .first();

        return result.text;
    } catch (e) {
        return `Error, ${e}`;
    }
};
