#!/bin/bash

YELLOW='\e[33m';
GREEN='\e[92m';
RESET='\e[0m';

echo -e "$YELLOW- Building test storage image${RESET}"
(cd __tests__ ; docker build . -t scrpr-storage)
echo -e "${GREEN}- Test storage image build complete${RESET}"

RUNNING_CONTAINER=$(docker container ls --filter name=scrpr-storage -aq)
if [[ $RUNNING_CONTAINER != "" ]]; then
  echo -e "${YELLOW}- Removing old container${RESET}"
  docker rm -f $RUNNING_CONTAINER
  echo -e "${GREEN}- Old container removed${RESET}"
fi

echo -e "$YELLOW- Starting test storage container${RESET}"
docker run -d -p 127.0.0.1:5432:5432 --name scrpr-storage scrpr-storage
echo -e "${GREEN}- Test storage container started${RESET}"

echo -e "$YELLOW- Starting tests${RESET}"
yarn build
node dist/db-test.js
echo -e "${GREEN}- Tests complete${RESET}"
