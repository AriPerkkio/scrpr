#!/bin/bash

YELLOW='\e[33m';
GREEN='\e[92m';
RESET='\e[0m';

echo -e "$YELLOW- Starting storage${RESET}"
( cd packages/storage ; yarn start )
echo -e "${GREEN}- Storage started${RESET}"

echo -e "$YELLOW- Starting api${RESET}"
echo -e "$YELLOW- Starting client${RESET}"
( cd packages/api ; yarn start ) & ( cd packages/client ; yarn start ) && fg
