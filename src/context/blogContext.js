"use client";

import { createContext, useState } from "react";

const BlogCtx = createContext();

const BlogProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singlePostDetails, setSinglePostDetails] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  return (
    <BlogCtx.Provider
      value={{
        userDetails,
        setUserDetails,
        allUsers,
        setAllUsers,
        allPosts,
        setAllPosts,
        setPageNumber,
        pageNumber,
        setIsModalOpen,
        isModalOpen,
        setSinglePostDetails,
        singlePostDetails,
        setIsEditMode,
        isEditMode,
        setIsGlobalLoading,
        isGlobalLoading,
        setUploadProgress,
        uploadProgress
      }}
    >
      {children}
    </BlogCtx.Provider>
  );
};

export { BlogCtx, BlogProvider };
