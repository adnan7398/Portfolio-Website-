#!/bin/bash

echo "Starting Portfolio Project..."

# Start backend
echo "Starting backend server..."
cd backend && node index.js &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start frontend
echo "Starting frontend server..."
cd ../frontend && npm run dev &
FRONTEND_PID=$!

echo "Servers started!"
echo "Backend: http://localhost:3001"
echo "Frontend: http://localhost:8081"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait 