/**
 * Wrapper for Custom Resource lambdas to make sure
 * stacks don't get stuck due to lambda timeout.
 */
export const callInTime = <T>(
    callback: () => Promise<void>,
    response: T,
    seconds: number
) => async (): Promise<T> => {
    const status = { done: false, error: false };

    function runCallback() {
        status.done = false;
        status.error = false;

        callback()
            .then(() => (status.done = true))
            .catch(() => (status.error = true));
    }

    runCallback();

    for (let timer = 0; timer < seconds; timer++) {
        await new Promise(r => setTimeout(r, 1000));

        if (status.done) {
            console.log(`Completed task in ${timer}s`);
            return response;
        } else if (status.error) {
            console.log(`Task failed in ${timer}s. Retrying`);
            runCallback();
        }
    }

    // TODO return failure response
    console.log('Task timed out');
    return response;
};
