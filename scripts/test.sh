#!/bin/bash

YELLOW='\e[33m';
GREEN='\e[92m';
RESET='\e[0m';


echo -e "${YELLOW}- Testing storage${RESET}"
( cd packages/storage ; yarn test )
echo -e "${GREEN}- Storage testing complete${RESET}"