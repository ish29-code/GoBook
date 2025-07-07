package services

import "strings"

type Sentiment struct {
	Score     float64 `json:"Score"`
	KeyPhrase string  `json:"KeyPhrase"`
}

func AnalyzeSentiment(text string) Sentiment {
	keywords := []string{"beach", "paradise", "view", "retreat"}
	for _, word := range keywords {
		if strings.Contains(strings.ToLower(text), word) {
			return Sentiment{Score: 0.85, KeyPhrase: word}
		}
	}
	return Sentiment{Score: 0.5, KeyPhrase: "neutral"}
}
