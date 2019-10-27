declare module 'handler' {
    import { AsyncHandler } from 'cfn-lambda';
    import { APIGatewayProxyResult } from 'aws-lambda';

    export function Create(): AsyncHandler;

    export default function createHandler({
        AsyncCreate,
        AsyncUpdate,
        AsyncDelete,
    }: {
        AsyncCreate: AsyncHandler;
        AsyncUpdate: AsyncHandler;
        AsyncDelete: AsyncHandler;
    }): Promise<APIGatewayProxyResult>;
}
