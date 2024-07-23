import { ICommentsPayload } from "@/interfaces/commentsInterface";
import { INewPostPayload } from "@/interfaces/createPostInterface";
import {
  IFileDetails,
  ILoginFormValues,
  ISubmitSignupFormValues,
} from "@/interfaces/formInterface";
import { ISearchPayload } from "@/interfaces/postsInterface";
import { blogServiceAPI, blogServiceUserRegisterAPI } from "@/utils/config";

// POSTS
export const createNewPost = async (payload: INewPostPayload) => {
  const { data } = await blogServiceAPI.post("/posts", payload);

  return data;
};

export const getAllPosts = async (currentPage: number) => {
  const { data } = await blogServiceAPI.get(
    `/posts?page=${currentPage}&pageSize=${10}`
  );

  return {
    data: data.data.posts,
    isLastPage: data.data.isLastPage,
  };
};

export const getPostDetails = async (id: string) => {
  const { data } = await blogServiceAPI.get(`/posts/${id}`);

  return data;
};

export const getSearchedPosts = async (payload: ISearchPayload) => {
  const { data } = await blogServiceAPI.post("/posts/search-posts", payload);

  return data.data;
};

export const deleteAPost = async (id: string) => {
  const { data } = await blogServiceAPI.delete(`/posts/${id}`);
  return data;
};

export const editAPost = async (id: string, payload: INewPostPayload) => {
  const { data } = await blogServiceAPI.put(`/posts/${id}`, payload);

  return data;
};

// USERS
export const followAUser = async (userId: string) => {
  const { data } = await blogServiceAPI.get(`/users/following/${userId}`);

  return data;
};

export const unFollowAUser = async (userId: string) => {
  const { data } = await blogServiceAPI.get(`/users/unfollow/${userId}`);

  return data;
};

export const fetchAllUsers = async () => {
  const { data } = await blogServiceAPI.get("users");

  return data.data;
};

export const imageUpload = async (payload: IFileDetails) => {
  const { data } = await blogServiceUserRegisterAPI.post(
    "/users/upload",
    payload
  );
  return data;
};

export const registerUser = async (payload: ISubmitSignupFormValues) => {
  const { data } = await blogServiceUserRegisterAPI.post(
    "/users/register",
    payload
  );

  return data.data;
};

export const loginUser = async (payload: ILoginFormValues) => {
  const { data } = await blogServiceAPI.post("/users/login", payload);

  return data.data;
};

export const loggedInUserProfile = async () => {
  const { data } = await blogServiceAPI.get("/users/profile/");

  return data;
};

// COMMENTS
export const addNewComment = async (id: string, payload: ICommentsPayload) => {
  const { data } = await blogServiceAPI.post(`/comments/${id}`, payload);

  return data;
};

export const deleteComment = async (id: string) => {
  const { data } = await blogServiceAPI.delete(`/comments/${id}`);

  return data;
};

export const editComment = async (id: string, payload: ICommentsPayload) => {
  const { data } = await blogServiceAPI.put(`/comments/${id}`, payload);

  return data;
};
