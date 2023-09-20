package structures

type InsertNoteRequest struct{
	Name    string             `bson:"name" json:"name"`
	Content string             `bson:"content" json:"content"`
} 

type UpdateNoteRequest struct{
	Name    string             `bson:"name" json:"name"`
	Content string             `bson:"content" json:"content"`
} 