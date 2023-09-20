package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Note struct {
	Id      primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	Name    string             `bson:"name" json:"name"`
	Content string             `bson:"content" json:"content"`
}

type InsertNote struct {
	Name    string `bson:"name" json:"name"`
	Content string `bson:"content" json:"content"`
}

type UpdateNote struct {
	Name    string `bson:"name" json:"name"`
	Content string `bson:"content" json:"content"`
}
