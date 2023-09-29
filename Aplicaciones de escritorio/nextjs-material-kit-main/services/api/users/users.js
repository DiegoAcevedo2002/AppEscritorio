import { endPoints } from '..';
import axios from 'axios';

const login = async (email, password) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.post(endPoints.auth.login, { email, password }, config);
  return await response;
};


const createUser = async (user) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(endPoints.users.createUser, user, config);
  return response.data;
};


export { createUser, login };

