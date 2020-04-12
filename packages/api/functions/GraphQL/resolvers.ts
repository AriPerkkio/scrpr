import { waitForConnection } from 'scrpr-storage/functions/utils/connection';
import { Configuration } from 'types/schema';

const getConfigurations = async (): Promise<Configuration[] | string> => {
    try {
        const pg = await waitForConnection();

        return pg('configurations');
    } catch (e) {
        console.log('Error', e);
        return `Error, ${e}`;
    }
};

const createConfiguration = async (
    _: any,
    configuration: Configuration
): Promise<Configuration | string> => {
    try {
        const pg = await waitForConnection();

        const [createdConfiguration] = await pg('configurations')
            .returning(['id', 'name', 'url'])
            .insert(configuration);

        return createdConfiguration;
    } catch (e) {
        console.log('Error', e);
        return `Error, ${e}`;
    }
};

export default {
    Query: {
        Configurations: getConfigurations,
    },
    Mutation: {
        createConfiguration,
    },
};
