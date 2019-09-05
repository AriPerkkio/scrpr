/* eslint-disable */
const proxy = require('http-proxy-middleware');
const config = require('scrpr-api/cf-public-values.json');

module.exports = app => {
    console.log(`Setting up proxy to http://${config.CloudFrontDomainName}`);

    app.use(
        proxy('/api/**', {
            changeOrigin: true,
            logLevel: 'debug',
            target: `http://${config.CloudFrontDomainName}`,
        })
    );
};
