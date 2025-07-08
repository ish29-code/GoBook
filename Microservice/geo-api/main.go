package main

import (
	"geo-api/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	router.GET("https://gogeo-api.onrender.com/hotels/:id/geo-sentiment", controllers.GetHotelGeoSentiment)

	router.Run(":8003")
}
