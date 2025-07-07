package routes

import (
	"gobook-backend/controllers"

	"github.com/gin-gonic/gin"
)

func SetupHotelRoutes(router *gin.Engine) {
	hotel := router.Group("/api/hotels")
	{
		hotel.GET("/:id/details", controllers.GetHotelDetails)
	}
}
