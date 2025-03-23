#!/bin/bash
export NODE_ID=3000
rm -rf tmp/
mkdir tmp
address=$(go run main.go createwallet)
#echo $address
node_gen=$(echo "$address" | awk '{print$4}' | tr -d '\n')
echo $node_gen
go run main.go createblockchain -address "$node_gen"
cp -rf ./tmp/blocks_3000 ./tmp/blocks_gen/
