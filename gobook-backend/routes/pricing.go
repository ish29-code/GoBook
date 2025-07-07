package routes

import (
	"gobook-backend/controllers"

	"github.com/gin-gonic/gin"
)

func SetupPricingRoutes(r *gin.Engine) {
	println("🛠️ SetupPricingRoutes is running...")

	r.POST("/api/predict/flight", controllers.PriceFlight)
	r.POST("/api/predict/hotel", controllers.PriceHotel)
}
