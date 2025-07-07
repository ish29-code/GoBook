package controllers

import (
	"context"
	"fmt"
	"net/http"
	"os"

	dialogflow "cloud.google.com/go/dialogflow/apiv2"
	dialogflowpb "cloud.google.com/go/dialogflow/apiv2/dialogflowpb"
	"github.com/gin-gonic/gin"
)

func ChatWithBot(c *gin.Context) {
	var req struct {
		Text string `json:"text"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		fmt.Println("JSON Binding error:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	projectID := os.Getenv("PROJECT_ID")
	if projectID == "" {
		fmt.Println("PROJECT_ID not set in environment")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "PROJECT_ID not set"})
		return
	}

	ctx := context.Background()

	sessionClient, err := dialogflow.NewSessionsClient(ctx)
	if err != nil {
		fmt.Println("Dialogflow client error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Dialogflow client error"})
		return
	}
	defer sessionClient.Close()

	sessionID := "gobook-session"
	sessionPath := fmt.Sprintf("projects/%s/agent/sessions/%s", projectID, sessionID)

	textInput := &dialogflowpb.TextInput{
		Text:         req.Text,
		LanguageCode: "en-US",
	}
	queryInput := &dialogflowpb.QueryInput{
		Input: &dialogflowpb.QueryInput_Text{Text: textInput},
	}

	request := &dialogflowpb.DetectIntentRequest{
		Session:    sessionPath,
		QueryInput: queryInput,
	}

	response, err := sessionClient.DetectIntent(ctx, request)
	if err != nil {
		fmt.Println("Dialogflow DetectIntent error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Dialogflow request failed"})
		return
	}

	reply := response.GetQueryResult().GetFulfillmentText()
	c.JSON(http.StatusOK, gin.H{"reply": reply})
}
