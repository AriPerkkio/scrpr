import { SchemaBuilder } from 'knex';

export const CONFIGURATIONS = 'configurations';
export const ID = 'id';
export const NAME = 'name';

export const createConfigurations = async (
    schemaBuilder: SchemaBuilder
): Promise<void | string> => {
    try {
        const hasConfigurations = await schemaBuilder.hasTable(CONFIGURATIONS);

        if (hasConfigurations) {
            console.log('Table exists already');
            return Promise.resolve('Table exists already');
        }

        return schemaBuilder.createTable(CONFIGURATIONS, table => {
            table.increments(ID).primary();
            table.string(NAME, 100);
        });
    } catch (e) {
        return Promise.reject('Initialization failed, ' + e.toString());
    }
};
