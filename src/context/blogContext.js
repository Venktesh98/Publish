"use client";

import { createContext, useState } from "react";

const BlogCtx = createContext();

const BlogProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [allPosts, setAllPosts] = useState([]);

  return (
    <BlogCtx.Provider
      value={{
        userDetails,
        setUserDetails,
        allUsers,
        setAllUsers,
        allPosts,
        setAllPosts,
      }}
    >
      {children}
    </BlogCtx.Provider>
  );
};

export { BlogCtx, BlogProvider };
