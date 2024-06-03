 #!/bin/sh
export NODE_ID=3000
rm -rf /tmp/*
rm -rf tmp/
mkdir -p tmp/wallets
address=$(/app/main createwallet)
node_gen=$(echo "$address" | awk '{print$4}' | tr -d '\n')
/app/main createblockchain -address "$node_gen"
cp -rf ./tmp/blocks_3000 ./tmp/blocks_gen/
echo $node_gen > ./tmp/wallets/3000
mv ./tmp/* /tmp/
