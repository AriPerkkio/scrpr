import knex from 'knex';
import { CONFIGURATIONS, NAME, URL } from './create-tables';

const INIT_CONFIGURATIONS = [
    { [NAME]: 'React JS', [URL]: 'https://reactjs.org/' },
    { [NAME]: 'Testing Library', [URL]: 'https://testing-library.com/' },
];

export const insertConfigurations = async (
    client: knex
): Promise<void | string> => {
    try {
        console.log('Inserting seed data: Configurations');

        for (let configuration of INIT_CONFIGURATIONS) {
            await client(CONFIGURATIONS).insert(configuration);
        }

        console.log('Seed data insertion completed: Configurations');
    } catch (e) {
        return Promise.reject('Initialization failed, ' + e.toString());
    }
};
