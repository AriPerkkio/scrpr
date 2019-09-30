#!/bin/bash

YELLOW='\e[33m';
GREEN='\e[92m';
RESET='\e[0m';

echo -e "${YELLOW}- Undeploying batch${RESET}"
( cd packages/batch ; yarn undeploy )
echo -e "${GREEN}- Batch undeploy complete${RESET}"

echo -e "${YELLOW}- Undeploying api${RESET}"
( cd packages/api ; yarn undeploy )
echo -e "${GREEN}- Api undeploy complete${RESET}"

echo -e "${YELLOW}- Undeploying client${RESET}"
( cd packages/client ; yarn undeploy )
echo -e "${GREEN}- Client undeploy complete${RESET}"

echo -e "${YELLOW}- Undeploying storage${RESET}"
( cd packages/storage ; yarn undeploy )
echo -e "${GREEN}- Storage undeploy complete${RESET}"

echo -e "${YELLOW}- Undeploying domain${RESET}"
( cd packages/domain ; yarn undeploy )
echo -e "${GREEN}- Domain undeploy complete${RESET}"

echo -e "${GREEN}- Stack undeploy complete${RESET}"
