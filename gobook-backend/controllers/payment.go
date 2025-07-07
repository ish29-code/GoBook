package controllers

import (
	"gobook-backend/database"
	"gobook-backend/models"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/razorpay/razorpay-go"
)

type CreateOrderRequest struct {
	Amount      int    `json:"amount"`
	UserID      string `json:"userId"`
	BookingType string `json:"bookingType"`
	BookingID   string `json:"bookingId"`
}

func CreateOrder(c *gin.Context) {
	var body CreateOrderRequest

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	key := os.Getenv("RAZORPAY_KEY_ID")
	secret := os.Getenv("RAZORPAY_KEY_SECRET")

	if key == "" || secret == "" {
		log.Println("Razorpay keys missing")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Razorpay keys not configured"})
		return
	}

	client := razorpay.NewClient(key, secret)

	orderData := map[string]interface{}{
		"amount":   body.Amount * 100,
		"currency": "INR",
		"receipt":  "receipt_" + body.BookingType + "_" + body.BookingID,
	}

	order, err := client.Order.Create(orderData, nil)
	if err != nil {
		log.Println("Razorpay order error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create order"})
		return
	}

	log.Println("Order Created:", order["id"])
	c.JSON(http.StatusOK, order)
}

func VerifyAndStorePayment(c *gin.Context) {
	var payment models.Payment

	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	payment.PaidAt = time.Now()

	collection := database.GetDBCollection("payments")
	_, err := collection.InsertOne(c, payment)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to store payment"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Payment stored successfully"})
}

func GetUserPayments(c *gin.Context) {
	userId := c.Param("userId")
	collection := database.GetDBCollection("payments")

	cursor, err := collection.Find(c, map[string]interface{}{"userId": userId})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch payments"})
		return
	}
	defer cursor.Close(c)

	var results []models.Payment
	if err := cursor.All(c, &results); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error decoding results"})
		return
	}

	c.JSON(http.StatusOK, results)
}
