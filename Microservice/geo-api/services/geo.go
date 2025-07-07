package services

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

type POI struct {
	POI string  `json:"POI"`
	KM  float64 `json:"KM"`
}

type googlePlaceResponse struct {
	Results []struct {
		Name string `json:"name"`
	} `json:"results"`
}

func GetNearbyPOIs(lat, lng float64) []POI {
	apiKey := os.Getenv("GOOGLE_MAPS_API_KEY")
	url := fmt.Sprintf("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=%f,%f&radius=3000&type=tourist_attraction&key=%s", lat, lng, apiKey)

	resp, err := http.Get(url)
	if err != nil {
		return []POI{{POI: "API_ERROR", KM: 0}}
	}
	defer resp.Body.Close()

	var data googlePlaceResponse
	json.NewDecoder(resp.Body).Decode(&data)

	var results []POI
	for i, place := range data.Results {
		if i == 5 {
			break
		}
		results = append(results, POI{
			POI: place.Name,
			KM:  2.5 + float64(i),
		})
	}
	return results
}
