package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/diegoacevedo190/GoProject/models"
	"github.com/diegoacevedo190/GoProject/repository"
	"github.com/diegoacevedo190/GoProject/responses"
	"github.com/diegoacevedo190/GoProject/server"
	"github.com/diegoacevedo190/GoProject/structures"
	"github.com/gorilla/mux"
)

func InsertNoteHandler(s server.Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		// Handle request
		w.Header().Set("Content-Type", "application/json")
		var req = structures.InsertNoteRequest{}
		err := json.NewDecoder(r.Body).Decode(&req)
		if err != nil {
			responses.BadRequest(w, "Invalid request")
			return
		}
		note := models.InsertNote{}

		note = models.InsertNote{
			Name:    req.Name,
			Content: req.Content,
		}

		createdNote, err := repository.InsertNote(r.Context(), &note)
		if err != nil {
			responses.InternalServerError(w, err.Error())
			return
		}
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(createdNote)
	}
}

func UpdateNoteHandler(s server.Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Handle request
		w.Header().Set("Content-Type", "application/json")
		params := mux.Vars(r)
		var req = structures.UpdateNoteRequest{}
		err := json.NewDecoder(r.Body).Decode(&req)
		if err != nil {
			responses.BadRequest(w, "Invalid request")
			return
		}
		note := models.UpdateNote{}

		note = models.UpdateNote{
			Name:    req.Name,
			Content: req.Content,
		}

		updatedNote, err := repository.UpdateNote(r.Context(), &note, params["id"])
		if err != nil {
			responses.InternalServerError(w, err.Error())
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(updatedNote)
	}
}

func DeleteNoteHandler(s server.Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Handle request
		w.Header().Set("Content-Type", "application/json")
		params := mux.Vars(r)
		err := repository.DeleteNote(r.Context(), params["id"])
		if err != nil {
			responses.InternalServerError(w, err.Error())
			return
		}
		responses.DeleteResponse(w, "Note deleted")
	}
}

func GetNoteByIdHandler(s server.Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Handle request
		w.Header().Set("Content-Type", "application/json")
		params := mux.Vars(r)
		note, err := repository.GetNoteById(r.Context(), params["id"])
		if err != nil {
			responses.InternalServerError(w, err.Error())
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(note)
	}
}

func ListNotesHandler(s server.Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Handle request
		w.Header().Set("Content-Type", "application/json")
		notes, err := repository.ListNotes(r.Context())
		if err != nil {
			responses.InternalServerError(w, err.Error())
			return
		}
		if notes == nil {
			notes = []models.Note{}
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(notes)
	}
}
