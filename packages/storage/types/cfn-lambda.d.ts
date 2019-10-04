declare module 'cfn-lambda' {
    import { APIGatewayProxyResult } from 'aws-lambda';

    interface ResponseBody {
        PhysicalResourceId: string;
    }

    type AsyncResponse = Promise<ResponseBody>;
    export type AsyncHandler = () => AsyncResponse;

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
