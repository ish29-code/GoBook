package controllers

import (
	"geo-api/assets"
	"geo-api/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetHotelGeoSentiment(c *gin.Context) {
	id := c.Param("id")
	hotel, exists := assets.Hotels[id]
	if !exists {
		c.JSON(http.StatusNotFound, gin.H{"error": "Hotel not found"})
		return
	}

	pois := services.GetNearbyPOIs(hotel.Lat, hotel.Lng)
	sentiment := services.AnalyzeSentiment(hotel.Name)

	c.JSON(http.StatusOK, gin.H{
		"Distances": pois,
		"Sentiment": sentiment,
	})
}
