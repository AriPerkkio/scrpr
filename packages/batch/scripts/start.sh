#!/bin/bash

YELLOW='\e[33m';
GREEN='\e[92m';
RESET='\e[0m';

echo -e "$YELLOW- Building batch${RESET}"
yarn build
echo -e "${GREEN}- Batch build complete${RESET}"

echo -e "$YELLOW- Running batch job${RESET}"
PUPPETEER_PATH="../.." \
node dist/batch-job.js
echo -e "${GREEN}- Batch job completed${RESET}"
