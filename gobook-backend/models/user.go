package models

import (
	"context"
	"gobook-backend/database"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID       primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Username string             `json:"username" bson:"username"`
	Email    string             `json:"email" bson:"email"`
	Password string             `json:"password" bson:"password"`
}

func CreateUser(user *User) error {
	collection := database.GetDBCollection("users")
	_, err := collection.InsertOne(context.Background(), user)
	return err
}

func FindUserByUsername(username string) (*User, error) {
	collection := database.GetDBCollection("users")
	var user User
	err := collection.FindOne(context.Background(), bson.M{"username": username}).Decode(&user)
	return &user, err
}
