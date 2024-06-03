# Blockchain Shop

## Dependencies

* Docker
* Kubernetes (using kind - Kubernetes in Docker)

## Getting Started

This repository sets up a Kubernetes cluster with a backend written in Go and a frontend written in Angular. Follow the steps below to get started.

### Create the Cluster

First, navigate to the `deployment` directory and run the `cluster.sh` script to create the cluster.

```bash
cd deployment
./cluster.sh
```

This script will create a Kubernetes cluster with 1 master node and 2 worker nodes. All components will be deployed with the correct configurations.

### Accessing the Backend API Documentation

Once the cluster is up and running, you can access the backend API documentation at:

[http://localhost:30000/api/swagger/index.html](http://localhost:30000/api/swagger/index.html)

## Managing the Blockchain

To manage the nodes and view information, you can connect to the node running on port 4000 inside the cluster. First, obtain the name of the pod running on node 4000 using the following command:

```bash
kubectl get pods
```

Look for a pod with a name similar to `blockchain-backend-8669d87f94-zshfw`.

Next, connect to the pod:

```bash
kubectl exec -it blockchain-backend-8669d87f94-zshfw -c blockchain-backend-4000 -- /bin/sh
```

### Node Roles

* **Node 3000**: Generates the blockchain and acts as the main node.
* **Node 4000**: Manages the API and oversees the blockchain when all components are running.
* **Node 5000**: Functions as a miner node.

## Additional Resources

For more information on Kubernetes, Docker, or kind, please refer to the official documentation:
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [kind Documentation](https://kind.sigs.k8s.io/)
