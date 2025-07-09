#!/bin/bash

echo "Starting GoBook services (interactive)..."

# Start Go backend
echo "Starting Go backend..."
cd /home/vagrant/gobook/backend
go run main.go

# Start React frontend (Vite)
echo "Starting React frontend..."
cd /home/vagrant/gobook/frontend
npm install
npm run dev -- --host

# Start itinerary service
echo "Starting itinerary-service..."
cd /home/vagrant/gobook/microservices/itinerary-service
go run main.go

# Start price prediction service (Flask)
echo "Starting price-prediction-service..."
cd /home/vagrant/gobook/microservices/price-prediction-service
pip3 install -r requirements.txt
python3 app.py

# Start geo-api service
echo "Starting geo-api service..."
cd /home/vagrant/gobook/microservices/geo-api
go run main.go

echo "All services finished (or still running)..."
