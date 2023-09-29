const API = `${process.env.NEXT_PUBLIC_API_URL}`;

const endPoints = {
  users: {
    profile: `${API}/profile`,
    createUser: `${API}/signup`,
    updateUser: (id) => `${API}/users/update/${id}`,
    deleteUser: (id) => `${API}/users/delete/${id}`,
  },
  notas: {
    getNotes: () => `${API}/note/list`,
    updateNotes: (id) => `${API}/note/update/${id}`,
    deleteNotes: (id) => `${API}/note/delete/${id}`,
    insertNotes:  `${API}/note`
  },
};
export default endPoints;