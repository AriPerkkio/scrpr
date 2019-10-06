import CfnLambda, { AsyncHandler } from 'cfn-lambda';
import knex from 'knex';
import { createConfigurations } from './create-tables';

const RESPONSE = { PhysicalResourceId: 'DatabaseInitialization' };
const pg = knex({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'scrpr_database',
    },
});

const Create: AsyncHandler = async () => {
    await createConfigurations(pg.schema);

    return RESPONSE;
};

const asyncNoop: AsyncHandler = async () => RESPONSE;

exports.handler = CfnLambda({
    AsyncCreate: Create,
    AsyncUpdate: asyncNoop,
    AsyncDelete: asyncNoop,
});
