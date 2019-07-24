const { db, getTable } = require('../utils');

const parseRequest = event => ({
    userId: event.requestContext.authorizer.claims.sub,
});

const generateQueryParams = userId => ({
    ...getTable(),
    ExpressionAttributeValues: {
        ':v1': { S: userId },
    },
    KeyConditionExpression: 'userId = :v1',
});

const getData = event =>
    new Promise((resolve, reject) => {
        try {
            const { userId } = parseRequest(event);
            const item = generateQueryParams(userId);

            db.query(item, (err, result) =>
                err ? reject(err) : resolve(result)
            );
        } catch (e) {
            reject(e.message);
        }
    });

const onSuccess = data => ({
    statusCode: 200,
    body: JSON.stringify({ data }),
});

const onFailure = error => ({
    statusCode: 500,
    body: JSON.stringify({ error }),
});

module.exports.getData = async event =>
    await getData(event)
        .then(onSuccess)
        .catch(onFailure);
