import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import Api from 'api';

async function fetchQuery(
    operation: { text: any },
    variables: any
): Promise<any> {
    const authToken = await Api.getAuthToken();
    const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
            'X-Authorization': authToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: operation.text, variables }),
    });

    return response.json();
}

const environment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
});

export default environment;
