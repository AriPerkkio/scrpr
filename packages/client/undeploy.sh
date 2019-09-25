#!/bin/bash

echo 'Clearing bucket'
aws s3 rm s3://scrpr-client-bucket --recursive
echo 'Bucket cleared'