const API = `${process.env.NEXT_PUBLIC_API_URL}`;

const endPoints = {
  notas: {
    getNotes: () => `${API}/note/list`,
    updateNotes: (id) => `${API}/note/update/${id}`,
    deleteNotes: (id) => `${API}/note/delete/${id}`,
    insertNotes:  `${API}/note`
  },
};
export default endPoints;