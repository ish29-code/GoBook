package controller

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
)

type ItineraryItem struct {
	Destination string `json:"destination"`
	DateRange   string `json:"dateRange"`
}

func loadDestinations() ([]string, error) {
	file, err := os.ReadFile("assets/destinations.json")
	if err != nil {
		return nil, err
	}

	var raw []map[string]string
	if err := json.Unmarshal(file, &raw); err != nil {
		return nil, err
	}

	var destinations []string
	for _, item := range raw {
		destinations = append(destinations, item["destination"])
	}
	return destinations, nil
}

func randomDateRange() string {
	start := time.Now().AddDate(0, 0, rand.Intn(30)) // within next 30 days
	end := start.AddDate(0, 0, rand.Intn(5)+1)       // 1-5 days later
	return start.Format("2006-01-02") + " to " + end.Format("2006-01-02")
}

func SuggestItinerary(c *gin.Context) {
	destinations, err := loadDestinations()
	if err != nil || len(destinations) == 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not load destinations"})
		return
	}

	rand.Shuffle(len(destinations), func(i, j int) {
		destinations[i], destinations[j] = destinations[j], destinations[i]
	})

	count := 3
	if len(destinations) < 3 {
		count = len(destinations)
	}

	var suggestions []ItineraryItem
	for i := 0; i < count; i++ {
		suggestions = append(suggestions, ItineraryItem{
			Destination: destinations[i],
			DateRange:   randomDateRange(),
		})
	}

	c.JSON(http.StatusOK, suggestions)
}
