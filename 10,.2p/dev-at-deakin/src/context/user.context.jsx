import { useReducer } from "react";
import { useState,useEffect } from "react";
import { createContext } from "react";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});


// Basicly making it stored in session, so updating page doesnt remove everything
let reducer = (info, newInfo) => {
  if (newInfo === null) {
    sessionStorage.removeItem("user");
    return null;
  }
  return { ...info, ...newInfo };
};

const localState = JSON.parse(sessionStorage.getItem("user"));

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useReducer(reducer, localState || null);
  const value = { currentUser, setCurrentUser };
  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
