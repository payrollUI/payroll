#!/bin/sh

# Function to handle shutdown signals
cleanup() {
    echo "Received shutdown signal, cleaning up..."
    # Kill the Node.js process gracefully
    kill -TERM "$pid" 2>/dev/null
    wait "$pid"
    exit 0
}

# Set up signal handlers
trap cleanup SIGTERM SIGINT

# Start the application
echo "Starting Next.js application..."
node server.js &
pid=$!

# Wait for the process
wait "$pid" 