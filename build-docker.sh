#!/bin/bash

# Exit on error
set -e

# Set your image name here
IMAGE_NAME="payroll-app:latest"

# Build the Next.js app (using yarn)
yarn install
yarn build

# Build the Docker image
docker build -t $IMAGE_NAME .

echo "Docker image '$IMAGE_NAME' built successfully." 