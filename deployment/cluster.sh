#!/bin/bash
kind create cluster --name blockchain-cluster --config kind-config.yaml
docker build -t blockchain-backend:0.1 -f ../Dockerfile ../
kind load --name blockchain-cluster docker-image blockchain-backend:0.1
kubectl apply -f start-blockchain-gen.yml
kubectl apply -f start-blockchain-node.yml
kubectl apply -f pv-pvc.yml
kubectl apply -f deployment.yml
kubectl apply -f service.yml
