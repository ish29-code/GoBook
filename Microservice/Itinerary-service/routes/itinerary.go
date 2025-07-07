package routes

import (
	"Itinerary-service/controller"

	"github.com/gin-gonic/gin"
)

func SetupItineraryRoutes(r *gin.Engine) {
	r.POST("/suggest", controller.SuggestItinerary)
}
