import React, { useReducer } from 'react';
import AppContext from './AppContext';

export default function Provider({ reducer, initialState = {}, children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
}
