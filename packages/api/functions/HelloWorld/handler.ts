import {
    APIGatewayEvent,
    APIGatewayProxyResult,
    APIGatewayEventRequestContext,
} from 'aws-lambda';

const parseRequest = (
    event: APIGatewayEvent
): { userId: string | number | true | {} } => {
    const { requestContext }: APIGatewayEvent = event;
    const { authorizer }: APIGatewayEventRequestContext = requestContext;
    const { claims } = authorizer || {};
    const { sub } = claims || {};

    return { userId: sub };
};

const onSuccess = (data: {}): APIGatewayProxyResult => ({
    statusCode: 200,
    body: JSON.stringify({ data }),
});

const onFailure = (error: {}): APIGatewayProxyResult => ({
    statusCode: 500,
    body: JSON.stringify({ error }),
});

module.exports.handler = (
    event: APIGatewayEvent
): Promise<APIGatewayProxyResult> =>
    new Promise((resolve, reject) => {
        try {
            resolve(onSuccess(parseRequest(event)));
        } catch (error) {
            reject(onFailure(error));
        }
    });
