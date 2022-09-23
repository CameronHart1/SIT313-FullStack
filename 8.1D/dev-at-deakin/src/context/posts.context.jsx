import { useReducer } from "react";
import { useState, useEffect } from "react";
import { createContext } from "react";
import { fetchQuestionsAndTutorials } from "../utils/firebase";
// import { addCollectionAndDocument } from "../utils/firebase";

// Basicly making it stored in session, so updating page doesnt remove everything
let reducer = (info, newInfo) => {
  if (newInfo === null) {
    sessionStorage.removeItem("Posts");
    return null;
  }
  return { ...info, ...newInfo };
};

const localState = JSON.parse(sessionStorage.getItem("Posts"));

export const PostContext = createContext({
  currentPosts: null,
  setCurrentPosts: () => null,
});

export const PostProvider = ({ children }) => {
  // useEffect(()=>{
  //     addCollectionAndDocument('posts',)
  // },[])
  const [currentPosts, setCurrentPosts] = useReducer(
    reducer,
    localState || null
  );
  const value = { currentPosts, setCurrentPosts };

  useEffect(() => {
    sessionStorage.setItem("Posts", JSON.stringify(currentPosts));
    if (currentPosts == null) {
      fetchQuestionsAndTutorials().then((data) => setCurrentPosts(data));
    }
  }, [currentPosts]);

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
