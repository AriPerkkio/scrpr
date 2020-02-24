#!/bin/bash

YELLOW='\e[33m';
GREEN='\e[92m';
RESET='\e[0m';

echo -e "$YELLOW- Starting tests${RESET}"
yarn build
node dist/db-test.js
echo -e "${GREEN}- Tests complete${RESET}"
