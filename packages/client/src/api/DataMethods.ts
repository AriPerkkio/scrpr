const getConfig = ({
    body,
    authToken,
}: {
    body?: {};
    authToken: string;
}): {} => ({
    headers: {
        'X-Authorization': authToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    method: body ? 'POST' : 'GET',
    body: body ? JSON.stringify(body) : undefined,
});

export const getHelloWorld = (authToken: string): Promise<void> =>
    fetch('/api/hello-world', getConfig({ authToken })).then(r => r.json());
