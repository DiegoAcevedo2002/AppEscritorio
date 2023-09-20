package database

import (
	"context"

	"github.com/diegoacevedo190/GoProject/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (repo *MongoRepo) InsertNote(ctx context.Context, note *models.InsertNote) (*models.Note, error) {
	collection := repo.client.Database("GoProject").Collection("notes")
	result, err := collection.InsertOne(ctx, note)

	if err != nil {
		return nil, err
	}
	createdNote, err := repo.GetNoteById(ctx, result.InsertedID.(primitive.ObjectID).Hex())
	if err != nil {
		return nil, err
	}
	return createdNote, nil
}

func (repo *MongoRepo) GetNoteById(ctx context.Context, id string) (*models.Note, error) {
	collection := repo.client.Database("GoProject").Collection("notes")
	oid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}
	var note models.Note
	err = collection.FindOne(ctx, bson.M{"_id": oid}).Decode(&note)
	if err != nil {
		return nil, err
	}
	return &note, nil
}

func (repo *MongoRepo) ListNotes(ctx context.Context) ([]models.Note, error) {
	collection := repo.client.Database("GoProject").Collection("notes")
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	var notes []models.Note
	if err = cursor.All(ctx, &notes); err != nil {
		return nil, err
	}
	return notes, nil
}

func (repo *MongoRepo) UpdateNote(ctx context.Context, data *models.UpdateNote, id string) (*models.Note, error) {
	collection := repo.client.Database("GoProject").Collection("notes")
	oid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}
	update := bson.M{
		"$set": bson.M{},
	}
	iterableData := map[string]interface{}{
		"name":    data.Name,
		"content": data.Content,
	}
	for key, value := range iterableData {
		if value != nil && value != "" {
			update["$set"].(bson.M)[key] = value
		}
	}
	_, err = collection.UpdateOne(ctx, bson.M{"_id": oid}, update)
	if err != nil {
		return nil, err
	}
	updatedNote, err := repo.GetNoteById(ctx, id)
	if err != nil {
		return nil, err
	}
	return updatedNote, nil
}

func (repo *MongoRepo) DeleteNote(ctx context.Context, id string) error {
	collection := repo.client.Database("GoProject").Collection("notes")
	oid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}
	_, err = collection.DeleteOne(ctx, bson.M{"_id": oid})
	if err != nil {
		return err
	}
	return nil
}
