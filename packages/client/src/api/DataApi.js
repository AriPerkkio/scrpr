const parseResponse = response => {
    if (response.ok) {
        return response.json();
    }

    return response.json().then(({ error }) => {
        throw new Error(error.message);
    });
};

const generateRequest = config =>
    fetch('/api/generic-data', config).then(parseResponse);

const config = ({ body, authToken }) => ({
    headers: {
        'X-Authorization': authToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    method: body ? 'POST' : 'GET',
    body: body ? JSON.stringify(body) : undefined,
});

const DataApi = authToken => ({
    get: () => generateRequest(config({ authToken })),
    post: body => generateRequest(config({ body, authToken })),
});

export default DataApi;
