import { SchemaBuilder } from 'knex';

export const CONFIGURATIONS = 'configurations';
export const ID = 'id';
export const NAME = 'name';
export const URL = 'url';

export const createConfigurations = async (
    schemaBuilder: SchemaBuilder
): Promise<void> => {
    try {
        const hasConfigurations = await schemaBuilder.hasTable(CONFIGURATIONS);

        if (hasConfigurations) {
            console.log('Table exists already');
            return;
        }

        await schemaBuilder.createTable(CONFIGURATIONS, table => {
            table.increments(ID).primary();
            table.string(NAME, 100);
            table.string(URL, 100);
        });

        console.log(`Table created: ${CONFIGURATIONS}`);
    } catch (e) {
        throw new Error('Initialization failed, ' + e.toString());
    }
};
