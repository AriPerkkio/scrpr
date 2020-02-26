FROM node:10

WORKDIR /usr/src/app

### Puppeteer's docker steps, https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-in-docker
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

COPY package.json ./

# Remove local dependencies from package.json. Yarn can't just ignore dev/optional dependencies without failure
RUN node -e "\
require('fs').writeFileSync( \
  './package.json', \
  JSON.stringify( \
    { \
      ...require('./package.json'), \
      dependencies: Object.entries(require('./package.json').dependencies) \
        .filter(([name]) => !/scrpr/.test(name)) \
        .reduce((all, [name, version]) => ({ ...all, [name]: version }), {}) \
    }, \
    null, \
    4 \
  ), \
  'utf8' \
); \
"

RUN cat ./package.json

RUN yarn install --production --ignore-optional \
    && groupadd -r scrpr-batch-user && useradd -r -g scrpr-batch-user -G audio,video scrpr-batch-user \
    && mkdir -p /home/scrpr-batch-user/ \
    && chown -R scrpr-batch-user:scrpr-batch-user /home/scrpr-batch-user/ \
    && chown -R scrpr-batch-user:scrpr-batch-user /usr/src/app/

COPY dist dist

USER scrpr-batch-user
ENV PUPPETEER_PATH '.'

CMD  ["node", "dist/batch-job.js"]