package routes

import (
	"gobook-backend/controllers"

	"github.com/gin-gonic/gin"
)

func SetupItineraryRoutes(router *gin.Engine) {
	itinerary := router.Group("/api/itinerary")
	{
		itinerary.GET("/suggest", controllers.SuggestItinerary)
	}
}
