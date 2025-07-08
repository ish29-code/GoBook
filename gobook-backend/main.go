package main

import (
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"gobook-backend/database"
	"gobook-backend/routes"
)

func main() {
	log.Println("Starting GoBook Backend...")

	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}
	log.Println("Environment variables loaded.")

	log.Println("PROJECT_ID:", os.Getenv("PROJECT_ID"))
	log.Println("GOOGLE_APPLICATION_CREDENTIALS:", os.Getenv("GOOGLE_APPLICATION_CREDENTIALS"))

	if os.Getenv("GOOGLE_APPLICATION_CREDENTIALS") == "" {
		log.Fatal("GOOGLE_APPLICATION_CREDENTIALS environment variable is not set or empty")
	}
	if os.Getenv("PROJECT_ID") == "" {
		log.Fatal("PROJECT_ID environment variable is not set or empty")
	}

	log.Println("Initializing MongoDB client...")
	database.InitMongoDB()
	log.Println("MongoDB init finished.")

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"https://gobook-zk45.onrender.com"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	routes.SetupAuthRoutes(router)
	routes.SetupItineraryRoutes(router)
	routes.SetupChatbotRoutes(router)
	routes.SetupPricingRoutes(router)
	routes.SetupHotelRoutes(router)
	routes.RegisterPaymentRoutes(router)

	log.Println("Server running on port 8080...")
	if err := router.Run(":8080"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}

	defer database.DisconnectMongoDB()
}
