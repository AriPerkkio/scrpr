FROM node:10

WORKDIR /usr/src/app

COPY package.json ./
COPY dist dist

### Puppeteer's docker steps, https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-in-docker
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN yarn install --production \
    && groupadd -r scrpr-batch-user && useradd -r -g scrpr-batch-user -G audio,video scrpr-batch-user \
    && mkdir -p /home/scrpr-batch-user/ \
    && chown -R scrpr-batch-user:scrpr-batch-user /home/scrpr-batch-user/ \
    && chown -R scrpr-batch-user:scrpr-batch-user /usr/src/app/

USER scrpr-batch-user
CMD  ["yarn", "start"]