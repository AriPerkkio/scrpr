import { waitForConnection } from 'functions/utils/connection';
import { createConfigurations } from './create-tables';
import { insertConfigurations } from './seed-data';

const MAX_RETRIES = 60; // Unstable custom resource can easily stuck the whole stack

export const handler = async () => {
    try {
        const pg = await waitForConnection(MAX_RETRIES);
        await createConfigurations(pg.schema);
        await insertConfigurations(pg);

        return 'Tables created';
    } catch (e) {
        console.log('Create failed', e);
        return 'Create failed';
    }
};
