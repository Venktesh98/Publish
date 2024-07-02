import { ILoginFormValues, ISubmitSignupFormValues } from "@/interfaces/formInterface";
import { ISearchPayload } from "@/interfaces/postsInterface";
import { blogServiceAPI, blogServiceUserRegisterAPI } from "@/utils/config";

export const getAllPosts = async (currentPage: number) => {
  const { data } = await blogServiceAPI.get(
    `/posts?page=${currentPage}&pageSize=${10}`
  );

  return {
    data: data.data.posts,
    isLastPage: data.data.isLastPage,
  };
};

export const getSearchedPosts = async (payload: ISearchPayload) => {
  const { data } = await blogServiceAPI.post("/posts/search-posts", payload);

  return data.data;
};

export const followAUser = async (userId: string) => {
  const { data } = await blogServiceAPI.get(`/users/following/${userId}`);

  return data.data;
};

export const fetchAllUsers = async () => {
  const { data } = await blogServiceAPI.get("users");

  return data.data;
};

export const registerUser = async (payload: ISubmitSignupFormValues) => {
  const { data } = await blogServiceUserRegisterAPI.post(
    "/users/register",
    payload
  );

  return data.data;
};

export const loginUser = async (payload: ILoginFormValues) => {
  const { data } = await blogServiceAPI.post(
    "/users/login",
    payload
  );

  return data.data;
};
