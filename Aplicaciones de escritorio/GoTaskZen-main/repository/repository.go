package repository

import (
	"context"

	"github.com/diegoacevedo190/GoProject/models"
)

type Repository interface {
	//Users
	InsertUser(ctx context.Context, user *models.InsertUser) (*models.Profile, error)
	GetUserById(ctx context.Context, id string) (*models.Profile, error)
	GetUserByEmail(ctx context.Context, email string) (*models.User, error)
	UpdateUser(ctx context.Context, data models.UpdateUser) (*models.Profile, error)
	DeleteUser(ctx context.Context, id string) error

	//Note
	InsertNote(ctx context.Context, note *models.InsertNote) (*models.Note, error)
	ListNotes(ctx context.Context) ([]models.Note, error)
	DeleteNote(ctx context.Context, id string) error
	UpdateNote(ctx context.Context, data *models.UpdateNote, id string) (*models.Note, error)
	GetNoteById(ctx context.Context, id string) (*models.Note, error)

	//Board
	InsertBoard(ctx context.Context, board *models.InsertBoard) (*models.Board, error)
	UpdateBoard(ctx context.Context, data *models.UpdateBoard, id string) (*models.Board, error)
	GetBoardById(ctx context.Context, id string) (*models.Board, error)
	ListBoards(ctx context.Context) ([]models.Board, error)
	DeleteBoard(ctx context.Context, id string) error

	//Close the connection
	Close() error
}

var implementation Repository

// Repo
func SetRepository(repository Repository) {
	implementation = repository
}

// Close the connection
func Close() error {
	return implementation.Close()
}
