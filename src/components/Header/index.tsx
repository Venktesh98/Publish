"use client";
import { IAllPosts } from "@/interfaces/postsInterface";
import { getAllPosts } from "@/services/services";
import { Layout } from "antd";
import { useContext, useEffect, useState } from "react";
import AllPosts from "../Posts";
import { BlogCtx } from "@/context/blogContext";

const BlogRootComp = () => {
  const { Content, Footer } = Layout;

  const { setAllPosts, allPosts } = useContext(BlogCtx);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const fetchedPosts = await getAllPosts(pageNumber);
      setAllPosts([...allPosts, ...fetchedPosts.data]);
      setPageNumber((prev) => prev + 1);
      setIsLastPage(fetchedPosts.isLastPage);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }

    if (isLastPage) {
      return;
    }
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <div>
      <Layout>
        <Content>
          <div>
            <AllPosts isLoading={isLoading} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Publish ©{new Date().getFullYear()} Created by Venktesh Soma
        </Footer>
      </Layout>
    </div>
  );
};

export default BlogRootComp;
