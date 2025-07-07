package models

import "time"

type Payment struct {
	ID          string    `bson:"_id,omitempty" json:"id"`
	UserID      string    `bson:"userId" json:"userId"`
	OrderID     string    `bson:"orderId" json:"orderId"`
	Amount      int       `bson:"amount" json:"amount"`
	Status      string    `bson:"status" json:"status"`
	PaidAt      time.Time `bson:"paidAt" json:"paidAt"`
	BookingType string    `bson:"bookingType" json:"bookingType"`
	BookingID   string    `bson:"bookingId" json:"bookingId"`
}
