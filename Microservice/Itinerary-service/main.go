package main

import (
	"Itinerary-service/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Setup route group for itinerary
	routes.SetupItineraryRoutes(r)

	r.Run(":8002") // Run the microservice on port 8002
}
