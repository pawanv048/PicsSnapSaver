import React, { createContext, useContext, useState } from 'react';

const DetailContext = createContext();

export const UserDetailProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <DetailContext.Provider value={{ name, email, setName, setEmail }}>
      {children}
    </DetailContext.Provider>
  );
};

export const useUserDetail = () => useContext(DetailContext);