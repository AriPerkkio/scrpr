/**
 * Wrapper for Custom Resource lambdas to make sure
 * stacks don't get stuck due to lambda timeout.
 */
export const callInTime = <T>(
    callback: () => Promise<void>,
    response: T,
    seconds: number
) => async (): Promise<T> => {
    const status = { current: false };

    callback().then(() => (status.current = true));

    for (let i = 0; i < seconds; i++) {
        await new Promise(r => setTimeout(r, 1000));

        if (status.current) {
            console.log('Completed task in time');
            return response;
        }
    }

    console.log('Task timed out');
    return response;
};
