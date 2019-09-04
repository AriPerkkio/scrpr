import knex from 'knex';

const pg = knex({
    client: 'pg',
    connection: {
        host: '',
        user: 'scrpr_user',
        password: '',
        database: 'scrpr_database',
    },
});

export const hello = async (): Promise<string> => {
    try {
        console.log('Starting query');

        const result = await pg('hello_world')
            .select('text')
            .first();

        console.log('Success', result.text);

        return result.text;
    } catch (e) {
        console.log('Error', e);
        return `Error, ${e}`;
    }
};
