import { waitForConnection } from 'scrpr-storage/functions/utils/connection';

export const hello = async (): Promise<string> => {
    try {
        const pg = await waitForConnection();

        const result = await pg('configurations')
            .select('name')
            .first();

        return result.name;
    } catch (e) {
        console.log('Error', e);
        return `Error, ${e}`;
    }
};
