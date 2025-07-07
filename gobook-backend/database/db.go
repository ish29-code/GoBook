package database

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
)

var client *mongo.Client

func InitMongoDB() {
	log.Println("👋 InitMongoDB was called")

	if err := godotenv.Load(); err != nil {
		log.Println("⚠️ Warning: No .env file found, using system environment variables")
	}

	mongoURI := os.Getenv("MONGO_URI")
	if mongoURI == "" {
		log.Fatal("❌ Error: MONGO_URI not set in .env file")
	}

	log.Println("🔑 MONGO_URI loaded:", mongoURI)

	clientOptions := options.Client().ApplyURI(mongoURI)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var err error
	client, err = mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatalf("❌ Failed to connect to MongoDB: %v", err)
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatalf("❌ Failed to ping MongoDB: %v", err)
	}

	log.Println("✅ Connected to MongoDB successfully!")
}

func GetDBCollection(collectionName string) *mongo.Collection {
	if client == nil {
		log.Fatal("MongoDB client is not initialized. Call InitMongoDB() first.")
	}
	return client.Database("gobook").Collection(collectionName)
}

func DisconnectMongoDB() {
	if client != nil {
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		if err := client.Disconnect(ctx); err != nil {
			log.Printf("⚠️ Failed to disconnect MongoDB: %v", err)
		} else {
			log.Println("✅ MongoDB connection closed.")
		}
	}
}

func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hashedPassword), err
}

func ComparePassword(hashedPassword, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}
