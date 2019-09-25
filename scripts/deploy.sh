#!/bin/bash

echo 'Deploying domain'
( cd packages/domain ; yarn deploy )
echo 'Domain deployment complete'

echo 'Deploying storage'
( cd packages/storage ; yarn deploy )
echo 'Storage deployment complete'

echo 'Deploying client'
( cd packages/client ; yarn deploy )
echo 'Client deployment complete'

echo 'Deploying api'
( cd packages/api ; yarn deploy )
echo 'Api deployment complete'

echo 'Deploying UI'
( cd packages/client ; yarn deploy:ui )
echo 'UI deployment complete'

echo 'Deploying batch'
( cd packages/batch ; yarn deploy )
echo 'Batch deployment complete'

echo 'Deploying container image'
( cd packages/batch ; ./build.sh )
echo 'Container image deployment complete'

echo 'Stack deployment complete'