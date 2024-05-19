#!/bin/sh
unset NODE_ID
export NODE_ID=$1
if [ "$NODE_ID" -ne "3000" ];
then
    address=$(/app/main createwallet)
    wallet=$(echo "$address" | awk '{print$4}' | tr -d '\n')
    echo $wallet > /app/tmp/$NODE_ID
    cp -rf /app/tmp/blocks_3000 /app/tmp/blocks_$NODE_ID/
    sleep 15
fi
if [ "$NODE_ID" == "3000" ];
then
    sleep 10
    wallet_3000=$(cat /app/tmp/3000 | tr -d '\n')
    wallet_4000=$(cat /app/tmp/4000 | tr -d '\n')
    /app/main send -from $wallet_3000 -to $wallet_4000 -amount 10 -mine
fi
if [ "$NODE_ID" == "4000" ];
then
    while true
    do
        sleep 60
        echo "Sync node 4000"
        /app/main startnode
        startnode_pid=$!
        kill $startnode_pid
    done
fi
if [ "$NODE_ID" == "5000" ];
then
    echo "Detected node 5000"
    /app/main startnode -miner $wallet
fi
