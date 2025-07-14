#!/bin/bash

# Exit on error
set -e

# Set your image name here
IMAGE_NAME="payroll-app:latest"

echo "🚀 Building Payroll Management System Docker Image..."

# Install dependencies and build the Next.js app
echo "📦 Installing dependencies..."
npm install

echo "🔨 Building the application..."
npm run build

# Build the Docker image
echo "🐳 Building Docker image..."
docker build -t $IMAGE_NAME .

echo "✅ Docker image '$IMAGE_NAME' built successfully!"
echo ""
echo "To run the container:"
echo "  docker run -p 3000:3000 $IMAGE_NAME"
echo ""
echo "Or use Docker Compose:"
echo "  docker-compose up -d" 