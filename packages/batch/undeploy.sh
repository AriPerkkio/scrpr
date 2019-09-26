#!/bin/bash

YELLOW='\e[33m';
GREEN='\e[92m';
RESET='\e[0m';

[[ "$(<cf-batch.yml)" =~ (Region: ([^[:space:]]*)) ]]
REGION=${BASH_REMATCH[2]}

echo -e "${YELLOW}- Deleting image${RESET}"
aws ecr batch-delete-image --repository-name scrpr-repository --region $REGION --image-ids imageTag=latest
echo -e "${GREEN}- Image deleted${RESET}"

echo -e "${YELLOW}- Remaining images:"
aws ecr list-images --repository-name scrpr-repository --region $REGION
echo -e "${RESET}"