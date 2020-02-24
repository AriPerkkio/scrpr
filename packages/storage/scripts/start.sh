#!/bin/bash

YELLOW='\e[33m';
GREEN='\e[92m';
RESET='\e[0m';

echo -e "$YELLOW- Building development storage image${RESET}"
(cd __tests__ ; docker build . -t scrpr-storage)
echo -e "${GREEN}- Development storage image build complete${RESET}"

RUNNING_CONTAINER=$(docker container ls --filter name=scrpr-storage -aq)
if [[ $RUNNING_CONTAINER != "" ]]; then
  echo -e "${YELLOW}- Removing old container${RESET}"
  docker rm -f $RUNNING_CONTAINER
  echo -e "${GREEN}- Old container removed${RESET}"
fi

echo -e "$YELLOW- Starting development storage container${RESET}"
docker run -d -p 127.0.0.1:5432:5432 --name scrpr-storage scrpr-storage
echo -e "${GREEN}- Development storage container started${RESET}"

echo -e "$YELLOW- Initializing database${RESET}"
yarn build
node -e "require('./dist/handler.js').Create().then(() => process.exit()).catch(e => { console.error(e); process.exit(1); })"
echo -e "${GREEN}- Initialization complete${RESET}"
