package routes

import (
	"gobook-backend/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterPaymentRoutes(router *gin.Engine) {
	paymentGroup := router.Group("/api/payment")
	{
		paymentGroup.POST("/create", controllers.CreateOrder)
		paymentGroup.POST("/verify", controllers.VerifyAndStorePayment)
		paymentGroup.GET("/history/:userId", controllers.GetUserPayments)
	}
}
