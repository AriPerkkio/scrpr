#!/bin/bash

YELLOW='\e[33m';
GREEN='\e[92m';
RESET='\e[0m';

echo -e "$YELLOW- Deploying domain${RESET}"
( cd packages/domain ; yarn deploy )
echo -e "${GREEN}- Domain deployment complete${RESET}"

echo -e "${YELLOW}- Deploying storage${RESET}"
( cd packages/storage ; yarn deploy )
echo -e "${GREEN}- Storage deployment complete${RESET}"

echo -e "${YELLOW}- Deploying client${RESET}"
( cd packages/client ; yarn deploy )
echo -e "${GREEN}- Client deployment complete${RESET}"

echo -e "${YELLOW}- Deploying api${RESET}"
( cd packages/api ; yarn deploy )
echo -e "${GREEN}- Api deployment complete${RESET}"

echo -e "${YELLOW}- Deploying UI${RESET}"
( cd packages/client ; yarn deploy:ui )
echo -e "${GREEN}- UI deployment complete${RESET}"

echo -e "${YELLOW}- Deploying batch${RESET}"
( cd packages/batch ; yarn deploy )
echo -e "${GREEN}- Batch deployment complete${RESET}"

echo -e "${YELLOW}- Deploying container image${RESET}"
( cd packages/batch ; ./build.sh )
echo -e "${GREEN}- Container image deployment complete${RESET}"

echo -e "${GREEN}- Stack deployment complete${RESET}"