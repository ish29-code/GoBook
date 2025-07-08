// controllers/price_controller.go
// controllers/pricing.go
package controllers

import (
	"bytes"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
)

func PriceFlight(c *gin.Context) {
	forwardRequest(c, "https://go-price-fy4m.onrender.com/predict/flight")
}

func PriceHotel(c *gin.Context) {
	forwardRequest(c, "https://go-price-fy4m.onrender.com/predict/hotel")
}

func forwardRequest(c *gin.Context, targetURL string) {
	body, _ := io.ReadAll(c.Request.Body)
	resp, err := http.Post(targetURL, "application/json", bytes.NewBuffer(body))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to contact ML service"})
		return
	}
	defer resp.Body.Close()

	responseBody, _ := io.ReadAll(resp.Body)
	c.Data(resp.StatusCode, "application/json", responseBody)
}
