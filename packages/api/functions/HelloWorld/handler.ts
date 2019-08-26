import {
    APIGatewayEvent,
    APIGatewayProxyResult,
    APIGatewayEventRequestContext,
    AuthResponseContext,
} from 'aws-lambda';

const parseRequest = (event: APIGatewayEvent): { userId: string } => {
    const { requestContext }: APIGatewayEvent = event;
    const { authorizer }: APIGatewayEventRequestContext = requestContext;
    const { claims }: AuthResponseContext = authorizer || {};
    const { sub }: { sub: string } = claims || {};

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

export const helloworld = (
    event: APIGatewayEvent
): Promise<APIGatewayProxyResult> =>
    new Promise((resolve, reject) => {
        try {
            resolve(onSuccess(parseRequest(event)));
        } catch (error) {
            reject(onFailure(error));
        }
    });
