package repository

import (
	"context"

	"github.com/diegoacevedo190/GoProject/models"
)

func InsertNote(ctx context.Context, note *models.InsertNote) (*models.Note, error) {
	return implementation.InsertNote(ctx, note)
}

func ListNotes(ctx context.Context) ([]models.Note, error) {
	return implementation.ListNotes(ctx)
}

func DeleteNote(ctx context.Context, id string) error {
	return implementation.DeleteNote(ctx, id)
}

func UpdateNote(ctx context.Context, data *models.UpdateNote, id string) (*models.Note, error) {
	return implementation.UpdateNote(ctx, data, id)
}
func GetNoteById(ctx context.Context, id string) (*models.Note, error) {
	return implementation.GetNoteById(ctx, id)
}
