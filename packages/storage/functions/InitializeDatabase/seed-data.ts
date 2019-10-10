import knex from 'knex';
import { CONFIGURATIONS, NAME } from './create-tables';

const INIT_CONFIGURATION = { [NAME]: 'Initial Configuration' };

export const insertConfigurations = async (
    client: knex
): Promise<void | string> => {
    try {
        return client(CONFIGURATIONS).insert(INIT_CONFIGURATION);
    } catch (e) {
        return Promise.reject('Initialization failed, ' + e.toString());
    }
};
