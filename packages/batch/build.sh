#!/bin/bash

[[ "$(<cf-values.yml)" =~ (ECRURI: ([^[:space:]]*)) ]]
ECR_URI=${BASH_REMATCH[2]}

[[ "$(<cf-values.yml)" =~ (Region: ([^[:space:]]*)) ]]
REGION=${BASH_REMATCH[2]}

EXISTING_IMAGE_ID=$(docker images -q scrpr-batch)

if [[ $EXISTING_IMAGE_ID != "" ]]; then
  echo 'Deleting existing image'
  docker rmi $EXISTING_IMAGE_ID
  docker rmi ${ECR_URI}
  echo 'Delete complete'
fi

docker build -t scrpr-batch .

if [[ $1 == "deploy" ]]; then
    echo 'Preparing to push image to ECR'
    docker tag scrpr-batch ${ECR_URI}
    aws ecr get-login --region $REGION --no-include-email
    docker push ${ECR_URI}
    echo 'Image pushed to ECR'
fi