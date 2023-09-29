import React, { useState, useContext, createContext, useEffect } from 'react';
import axios from 'axios';
import endPoints from '../services/api';
import { login } from '../services/api/users/users';

const AuthContext = createContext({});

export function ProviderAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const logins = async (email, password) => {
    login(email, password).then((res) => {
        setUser(res);
    });
    
  };

  const logout = () => {
    setUser(null);
    window.location.href = '/login';
  };

  return {
    user,
    logins,
    logout,
  };
}
