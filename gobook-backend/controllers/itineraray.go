package controllers

import (
	"bytes"
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SuggestItinerary(c *gin.Context) {
	userId := c.Query("userId")

	reqBody, _ := json.Marshal(gin.H{"userId": userId})

	resp, err := http.Post("http://localhost:8002/suggest", "application/json", bytes.NewBuffer(reqBody))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var suggestions []map[string]interface{}
	err = json.NewDecoder(resp.Body).Decode(&suggestions)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid response from microservice"})
		return
	}

	c.JSON(http.StatusOK, suggestions)
}
