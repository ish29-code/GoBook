package routes

import (
	"gobook-backend/controllers"

	"github.com/gin-gonic/gin"
)

func SetupChatbotRoutes(router *gin.Engine) {
	router.POST("/api/chatbot", controllers.ChatWithBot)
}
