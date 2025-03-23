#!/bin/bash
export NODE_ID=$1
address=$(go run main.go createwallet)
cp -rf ./tmp/blocks_3000 ./tmp/blocks_$NODE_ID/
echo $address
