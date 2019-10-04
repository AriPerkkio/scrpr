import CfnLambda, { AsyncHandler } from 'cfn-lambda';

const PhysicalResourceId = 'DatabaseInitialization';

const Create: AsyncHandler = async () => {
    console.log('TODO populate database with tables');

    return {
        PhysicalResourceId,
    };
};

const asyncNoop: AsyncHandler = async () => {
    return {
        PhysicalResourceId,
    };
};

exports.handler = CfnLambda({
    AsyncCreate: Create,
    AsyncUpdate: asyncNoop,
    AsyncDelete: asyncNoop,
});
