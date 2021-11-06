import React, { useState, createContext } from 'react';

const UserContext = createContext([{}, () => {}]);

const UserProvider = (props) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    uid: '',
    isLoggedIn: null,
    firstLogin: null,
  });

  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
