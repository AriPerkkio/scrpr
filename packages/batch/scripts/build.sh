#!/bin/bash

YELLOW='\e[33m';
GREEN='\e[92m';
RESET='\e[0m';

[[ "$(<cf-batch.yml)" =~ (ECRURI: ([^[:space:]]*)) ]]
ECR_URI=${BASH_REMATCH[2]}

[[ "$(<cf-batch.yml)" =~ (Region: ([^[:space:]]*)) ]]
REGION=${BASH_REMATCH[2]}

EXISTING_IMAGE_ID=$(docker images -q scrpr-batch)
if [[ $EXISTING_IMAGE_ID != "" && $1 != "--test" ]]; then
  echo -e "${YELLOW}- Deleting existing image${RESET}"
  docker rmi -f $EXISTING_IMAGE_ID
  echo -e "${GREEN}- Delete complete${RESET}"
fi

if [[ $1 == "--test" ]]; then
    yarn build:test
    docker build -t scrpr-batch .
    docker rm -f scrpr-batch
    docker run --link db-test --name scrpr-batch scrpr-batch
else
    yarn build
    docker build -t scrpr-batch .
fi

if [[ $1 == "--deploy" ]]; then
    echo -e "${YELLOW}- Preparing to push image to ECR${RESET}"
    docker rmi -f ${ECR_URI}
    docker tag scrpr-batch ${ECR_URI}

    # 'aws ecr get-login' returns 'docker login' command. Wrap it in eval to run login
    eval $(aws ecr get-login --region $REGION --no-include-email)
    docker push ${ECR_URI}
    echo -e "${GREEN}- Image pushed to ECR${RESET}"
fi