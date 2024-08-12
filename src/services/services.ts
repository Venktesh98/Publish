import { ICommentsPayload } from "@/interfaces/commentsInterface";
import { INewPostPayload } from "@/interfaces/createPostInterface";
import {
  ICategoryPayload,
  IFileDetails,
  ILoginFormValues,
  ISubmitSignupFormValues,
  IUpdateUserFields,
} from "@/interfaces/formInterface";
import { ISearchPayload } from "@/interfaces/postsInterface";
import {
  blogServiceAPI,
  blogServiceUserCreateNewPostAPI,
  blogServiceUserRegisterAPI,
} from "@/utils/config";

// POSTS
export const createNewPost = async (payload: INewPostPayload) => {
  const { data } = await blogServiceUserCreateNewPostAPI.post(
    "/posts",
    payload
  );

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
  const { data } = await blogServiceUserCreateNewPostAPI.put(
    `/posts/${id}`,
    payload
  );

  return data;
};

export const likePost = async (postId: string) => {
  const { data } = await blogServiceAPI.get(`/posts/like/${postId}`);

  return data;
};

export const unLikePost = async (postId: string) => {
  const { data } = await blogServiceAPI.get(`/posts/dislike/${postId}`);

  return data;
};

// USERS
export const updateUserDetails = async (payload: IUpdateUserFields) => {
  const { data } = await blogServiceAPI.put(`/users/`, payload);

  return data;
};

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

export const imageUpload = async (
  route: string,
  payload: IFileDetails,
  onUploadProgress: (progress: number) => void
) => {
  const { data } = await blogServiceUserRegisterAPI.post(
    `/${route}/upload`,
    payload,
    {
      onUploadProgress: (progressEvent: any) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent?.total
        );
        onUploadProgress(percentCompleted);
      },
    }
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

export const blockUser = async (id: string) => {
  const { data } = await blogServiceAPI.get(`/users/blocked/${id}`);

  return data;
};

export const unBlockUser = async (id: string) => {
  const { data } = await blogServiceAPI.get(`/users/unblocked/${id}`);

  return data;
};

export const bookmarkPost = async (id: string) => {
  const { data } = await blogServiceAPI.get(`/users/bookmark/${id}`);

  return data;
};

export const removeBookmarkPost = async (id: string) => {
  const { data } = await blogServiceAPI.get(`/users/remove-bookmark/${id}`);

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

// CATEGORIES
export const fetchCategories = async () => {
  const { data } = await blogServiceAPI.get(`/categories/`);

  return data;
};

export const createNewCategory = async (payload: ICategoryPayload) => {
  const { data } = await blogServiceAPI.post(`/categories/`, payload);

  return data;
};

