import axios from 'axios';
import endPoints from '..';

export const insertNotes = async (data) => {
    const config = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(endPoints.notas.insertNotes, data, config);
    return response.data;
  };

  export const getNotes = async () => {
    const config = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.get(endPoints.notas.getNotes(), config);
    return response.data;
  };
  
  export const updateNotes = async (noteid, data) => {
    const config = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.patch(endPoints.notas.updateNotes(noteid), data, config);
    return response.data;
  };

  export const deleteNotes = async (noteid) => {
    const config = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.delete(endPoints.notas.deleteNotes(noteid), config);
    return response.data;
  }; 