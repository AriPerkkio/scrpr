#!/bin/bash

[[ "$(<cf-batch.yml)" =~ (Region: ([^[:space:]]*)) ]]
REGION=${BASH_REMATCH[2]}

echo Deleting image
aws ecr batch-delete-image --repository-name scrpr-repository --region $REGION --image-ids imageTag=latest
echo Image deleted

echo Remaining images:
aws ecr list-images --repository-name scrpr-repository --region $REGION