# GoBook:  Travel Booking Platform

GoBook is a next-generation travel booking platform that blends modern web technologies with AI microservices to deliver intelligent search, itinerary suggestions, price predictions, geo-insights, and conversational chatbot assistance.

Live Site: [https://GoBook.com](https://www.hufd.xyz)


---

## ✨ Features

* 🌐 Smart Search with NLP (Hotels & Flights)
* 🌍 Geo Intelligence with Map Insights & Sentiment
* ✈️ Price Prediction using AI/ML (Flights & Hotels)
* 🧍️‍💻 AI Chatbot (Dialogflow)
* 🛅 Smart Itinerary Generator
* 📊 Modular Microservices Architecture
* ⛏ Built with React + Tailwind (Frontend), Go + Gin + MongoDB (Backend)
* 🤝 JWT Auth, Razorpay Payments, and Responsive UI

---

## ⚙️ Installation (Local Dev Environment)

### Prerequisites

* Node.js 18+
* Go 1.23.4
* MongoDB 4.4+
* Python 3.9+ (for AI microservices)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/gobook.git
cd gobook
```

### 2. Start MongoDB

```bash
sudo systemctl start mongod
```

### 3. Setup Backend

```bash
cd gobook-backend
cp .env.example .env
# Add your MongoDB URI, JWT secret, and Dialogflow credentials path in .env

go mod tidy
go run main.go
```

### 4. Setup Frontend

```bash
cd ../gobook-frontend
npm install
npm run dev
```

Open [http://localhost:5137](http://localhost:5137) in your browser.

---

## 🏠 Local Deployment with Vagrant (No Docker)

### 1. Files Required:

* `Vagrantfile`
* `provision.sh`
* `start-all.sh`

### 2. Run Vagrant VM

```bash
vagrant up
vagrant ssh
./start-all.sh
```

---

## 🚧 Microservices Setup

Each microservice is inside `/microservices/`

### 1. itinerary-service (Go)

```bash
cd microservices/itinerary-service
go run main.go  # Port: 8002
```

### 2. price-prediction-service (Python + Flask)

```bash
cd microservices/price-prediction-service
pip install -r requirements.txt
python app.py  # Port: 8003
```

### 3. geo-api (Go)

```bash
cd microservices/geo-api
go run main.go  # Port: 8004
```

---

## 🚀 Production Deployment

### ⛰ Deploy with Docker Compose

```bash
docker-compose up --build
```

Each microservice has its own Dockerfile. Adjust `.env`, ports, and volumes in `docker-compose.yml`.

### 🌎 Deploy to AWS

* Launch EC2 Instance
* Install Docker and Docker Compose
* Clone Repo and Run Docker Compose
* Setup MongoDB (Atlas or EC2)
* Point GoDaddy domain to EC2 Public IP via A record

---

## 📎 Domain Binding (GoDaddy + Render)

### On GoDaddy:

* Go to DNS settings
* Add A Record:

  * `@` -> `Render Public IP`
  * Or add CNAME for subdomain

### On Render:

* Go to your service > Settings > Custom Domain
* Add domain (e.g., `gobook.yourdomain.com`)
* Verify and Deploy

---

## 🚀 APIs Summary

| Service   | Endpoint                            | Method | Description            |
| --------- | ----------------------------------- | ------ | ---------------------- |
| User      | `/api/user/register`                | POST   | Register user          |
| Auth      | `/api/user/login`                   | POST   | Login and return JWT   |
| Flights   | `/api/flights/search`               | GET    | Search flights         |
| Hotels    | `/api/hotels/search`                | GET    | Search hotels          |
| Itinerary | `/api/itinerary/suggest?userId=...` | GET    | Suggest trips          |
| Price AI  | `/api/predict/flight`               | POST   | Predict flight price   |
| Price AI  | `/api/predict/hotel`                | POST   | Predict hotel price    |
| Geo       | `/api/hotels/:id/details`           | GET    | Get POIs and sentiment |
| Chatbot   | `/api/chatbot`                      | POST   | Ask chatbot            |

---

---

## ❤️ Contributing

Pull requests and feature suggestions are welcome!

---

## 🌐 Live GoBook Site

🔗 [https://GoBook.com](https://www.hufd.xyz)

❤️Thankyou
