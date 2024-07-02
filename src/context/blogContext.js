"use client";

import { createContext, useState } from "react";

const BlogCtx = createContext();

const BlogProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [allUsers, setAllUsers] = useState(null);

  return (
    <BlogCtx.Provider
      value={{ userDetails, setUserDetails, allUsers, setAllUsers }}
    >
      {children}
    </BlogCtx.Provider>
  );
};

export { BlogCtx, BlogProvider };
