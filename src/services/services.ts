import { ISearchPayload } from "@/interfaces/postsInterface";
import { blogServiceAPI } from "@/utils/config";

export const getAllPosts = async () => {
  const { data } = await blogServiceAPI.get(`/posts`);
  return data.data;
};

export const getSearchedPosts = async (payload: ISearchPayload) => {
  const { data } = await blogServiceAPI.post("/posts/search-posts", payload);
  console.log("Data:", data);

  return data.data;
};
