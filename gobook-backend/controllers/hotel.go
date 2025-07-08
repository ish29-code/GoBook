package controllers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetHotelDetails(c *gin.Context) {
	id := c.Param("id")

	var detail struct {
		Distances []struct {
			POI string  `json:"POI"`
			KM  float64 `json:"KM"`
		} `json:"Distances"`
		Sentiment struct {
			Score     float64 `json:"Score"`
			KeyPhrase string  `json:"KeyPhrase"`
		} `json:"Sentiment"`
	}

	url := "https://gogeo-api.onrender.com/hotels/" + id + "/geo-sentiment"
	log.Println("Calling geo-api:", url)

	resp, err := http.Get(url)
	if err != nil {
		log.Println("geo-api call failed:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "geo-api unreachable: " + err.Error()})
		return
	}
	defer resp.Body.Close()

	log.Println("geo-api status:", resp.Status)

	if resp.StatusCode != http.StatusOK {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "geo-api returned status: " + resp.Status})
		return
	}

	if err := json.NewDecoder(resp.Body).Decode(&detail); err != nil {
		log.Println("Failed to decode geo-api response:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode geo-api response: " + err.Error()})
		return
	}

	log.Println("Sending geo response to frontend:", detail)
	c.JSON(http.StatusOK, detail)
}
