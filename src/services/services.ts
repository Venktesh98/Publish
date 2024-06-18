import { ISearchPayload } from "@/interfaces/postsInterface";
import { blogServiceAPI } from "@/utils/config";

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
  console.log("Data:", data);

  return data.data;
};
