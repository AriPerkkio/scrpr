#!/bin/bash

EXISTING_IMAGE_ID=$(docker images -q scrpr-batch)

if [[ $EXISTING_IMAGE_ID != "" ]]; then
  echo 'Deleting existing image'
  docker rmi $EXISTING_IMAGE_ID
  echo 'Delete complete'
fi

docker build -t scrpr-batch .

if [[ $1 == "deploy" ]]; then
    echo 'TODO deploy to ECR'
fi