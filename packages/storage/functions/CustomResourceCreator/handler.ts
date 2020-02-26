/**
 * Lambda outside VPC for
 * - invoking another lambda in VPC for database initialization
 * - responding to cloudformation's pre-signed URL via internet
 */
import CfnLambda, { AsyncHandler } from 'cfn-lambda';
import { Lambda } from 'aws-sdk';

import { callInTime } from './utils';

const RESPONSE = { PhysicalResourceId: 'DatabaseInitialization' };
const FunctionName = 'InitializeDatabase';
const InvocationType = 'RequestResponse';

// TODO Read region from cf-domain.yml
const lambda = new Lambda({ region: 'us-east-1' });
const asyncNoop: AsyncHandler = async () => RESPONSE;

const callDatabaseInitialization = async () => {
    await new Promise(resolve => {
        lambda.invoke({ FunctionName, InvocationType }, (error, data) => {
            if (error) console.log('Error', error);
            console.log('Received data', JSON.stringify(data, null, 4));

            resolve();
        });
    });
};

export const handler = CfnLambda({
    AsyncCreate: callInTime(callDatabaseInitialization, RESPONSE, 850),
    AsyncUpdate: asyncNoop,
    AsyncDelete: asyncNoop,
});
