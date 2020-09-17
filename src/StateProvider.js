import React, { createContext, useContext, useReducer } from "react";

// Prepares Data Layer
export const StateContext = createContext();

// Wraps the app and provides the Data Layer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// Pulls information from the Data Layer
export const useStateValue = () => useContext(StateContext);
