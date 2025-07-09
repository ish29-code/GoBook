#!/bin/bash

echo "Starting GoBook services (interactive)..."


echo "Starting Go backend..."
cd /home/vagrant/gobook/gobook-backend
go run main.go

echo "Starting React frontend..."
cd /home/vagrant/gobook/gobook-frontend
npm install
npm run dev -- --host 

echo "Starting itinerary-service..."
cd /home/vagrant/gobook/Microservice/Itinerary-service
go run main.go

echo "Starting price-prediction-service..."
cd /home/vagrant/gobook/Microservice/price-prediction-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
export FLASK_APP=app.py
flask run --host=0.0.0.0 --port=8003

echo "Starting geo-api service..."
cd /home/vagrant/gobook/Microservice/geo-api
go run main.go

echo "All services finished (or still running)..."
