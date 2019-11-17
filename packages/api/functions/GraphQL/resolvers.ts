import { waitForConnection } from 'scrpr-storage/functions/utils/connection';

export const Configurations = async (userId: string): Promise<string> => {
    try {
        const pg = await waitForConnection();

        const result = await pg('configurations').first();

        console.log(result);

        return result;
    } catch (e) {
        console.log('Error', e);
        return `Error, ${e}`;
    }
};
