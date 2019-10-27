/* eslint-disable */
const proxy = require('http-proxy-middleware');
const config = require('scrpr-api/cf-api.json');

const USE_LOCAL_API = true;

module.exports = app => {
    app.use(
        proxy('/api/**', {
            changeOrigin: true,
            logLevel: 'debug',
            target: USE_LOCAL_API
                ? 'http://localhost:5000'
                : `http://${config.CloudFrontDomainName}`,
        })
    );
};
