import CfnLambda, { AsyncHandler } from 'cfn-lambda';

import { waitForConnection } from 'functions/utils/connection';
import { createConfigurations } from './create-tables';
import { insertConfigurations } from './seed-data';

const RESPONSE = { PhysicalResourceId: 'DatabaseInitialization' };

export const Create: AsyncHandler = async () => {
    const pg = await waitForConnection();

    await createConfigurations(pg.schema);
    await insertConfigurations(pg);

    return RESPONSE;
};

const asyncNoop: AsyncHandler = async () => RESPONSE;

export const handler = CfnLambda({
    AsyncCreate: Create,
    AsyncUpdate: asyncNoop,
    AsyncDelete: asyncNoop,
});
