import CfnLambda, { AsyncHandler } from 'cfn-lambda';

import { waitForConnection } from 'functions/utils/connection';
import { createConfigurations } from './create-tables';
import { insertConfigurations } from './seed-data';

const RESPONSE = { PhysicalResourceId: 'DatabaseInitialization' };
const MAX_RETRIES = 10; // Unstable custom resource can easily stuck the whole stack

export const AsyncCreate: AsyncHandler = async () => {
    try {
        const pg = await waitForConnection(MAX_RETRIES);

        await createConfigurations(pg.schema);
        await insertConfigurations(pg);

        return RESPONSE;
    } catch (e) {
        console.log('Create failed', e);
        return RESPONSE;
    }
};

const asyncNoop: AsyncHandler = async () => RESPONSE;

export const handler = CfnLambda({
    AsyncCreate,
    AsyncUpdate: asyncNoop,
    AsyncDelete: asyncNoop,
});
