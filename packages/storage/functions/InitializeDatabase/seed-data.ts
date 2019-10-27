import knex from 'knex';
import { CONFIGURATIONS, NAME } from './create-tables';

const INIT_CONFIGURATION = { [NAME]: 'Initial Configuration' };

export const insertConfigurations = async (
    client: knex
): Promise<void | string> => {
    try {
        console.log('Inserting seed data: Configurations');
        await client(CONFIGURATIONS).insert(INIT_CONFIGURATION);
        console.log('Seed data insertion completed: Configurations');
    } catch (e) {
        return Promise.reject('Initialization failed, ' + e.toString());
    }
};
