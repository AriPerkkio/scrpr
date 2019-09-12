FROM node:10

WORKDIR /usr/src/app

COPY package.json ./
COPY src .

RUN yarn install --production

CMD [ "node", "batch-job.js" ]