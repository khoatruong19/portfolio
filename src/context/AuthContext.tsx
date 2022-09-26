import React, { createContext, useState } from 'react';

interface IAuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: Function;
}

const AuthContext = createContext<IAuthState>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
