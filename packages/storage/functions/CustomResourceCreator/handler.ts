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

const lambda = new Lambda({ region: process.env.CF_REGION });
const asyncNoop: AsyncHandler = async () => RESPONSE;

const callDatabaseInitialization = async () => {
    try {
        await new Promise((resolve, reject) => {
            lambda.invoke({ FunctionName, InvocationType }, (error, data) => {
                if (error) {
                    console.log('Error', error);
                    return reject(error);
                }

                console.log('Received data', JSON.stringify(data, null, 4));

                resolve();
            });
        });
    } catch (e) {
        throw new Error(e);
    }
};

export const handler = CfnLambda({
    AsyncCreate: callInTime(callDatabaseInitialization, RESPONSE, 850),
    AsyncUpdate: asyncNoop,
    AsyncDelete: asyncNoop,
});
