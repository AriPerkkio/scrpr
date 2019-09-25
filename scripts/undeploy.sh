#!/bin/bash

echo 'Undeploying batch'
( cd packages/batch ; ./undeploy.sh )
( cd packages/batch ; yarn undeploy )
echo 'Batch undeploy complete'

echo 'Undeploying api'
( cd packages/api ; yarn undeploy )
echo 'Api undeploy complete'

echo 'Undeploying client'
( cd packages/client ; ./undeploy.sh )
( cd packages/client ; yarn undeploy )
echo 'Client undeploy complete'

echo 'Undeploying storage'
( cd packages/storage ; yarn undeploy )
echo 'Storage undeploy complete'

echo 'Undeploying domain'
( cd packages/domain ; yarn undeploy )
echo 'Domain undeploy complete'

echo 'Stack undeploy complete'