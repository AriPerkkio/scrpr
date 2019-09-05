const fs = require('fs');

const writeJsons = (data, name) => {
    const json = JSON.stringify(data, null, 4);

    fs.writeFile(name, json, 'utf8', err =>
        err
            ? console.log(`Failed to write file ${name}, ${err.toString()}`)
            : console.log(`Stack output ${name} complete: \n${json}`)
    );
};

const handler = data => {
    const {
        UserPool,
        UserPoolClient,
        CloudFrontDomainName,

        // Values for API. Hidden from end users.
        ...privateValues,
    } = data;

    // Values for UI. End users can see these in plaintext
    const publicValues = { UserPool, UserPoolClient, CloudFrontDomainName };

    writeJsons(publicValues, 'cf-public-values.json');
    writeJsons(privateValues, 'cf-hidden-values.json');
};

module.exports = { handler };
