#!/bin/bash

YELLOW='\e[33m';
GREEN='\e[92m';
RESET='\e[0m';

echo -e "${YELLOW}- Clearing bucket${RESET}"
aws s3 rm s3://scrpr-client-bucket --recursive
echo -e "${GREEN}- Bucket cleared${RESET}"