#!/bin/bash

set -e

# Setting up credentials
read -p "Enter username for basic auth: " USERNAME
read -sp "Enter password for basic auth: " PASSWORD
echo

# Generate htpasswd entry
HTPASSWD=$(printf "%s:%s" "$USERNAME" "$(openssl passwd -apr1 "$PASSWORD")")

# Base64 encode the htpasswd entry
B64_USERS=$(echo -n "$HTPASSWD" | base64)

# Variables
NAMESPACE=${NS:-default}
RELEASE_NAME="paveld-rads"
CHART_DIR="./helm"

echo "Deploying Helm chart..."

helm upgrade --install $RELEASE_NAME $CHART_DIR \
  --namespace $NAMESPACE \
  --create-namespace \
  --set basicAuth.users="$B64_USERS" \
  --set ingress.hostname="paveld-rads.druyan.net"

echo "Deployment finished successfully!"
