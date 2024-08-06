"use client";
import { BlogCtx } from "@/context/blogContext";
import { fetchCategories, getAllPosts } from "@/services/services";
import { Layout } from "antd";
import { useContext, useEffect, useState } from "react";
import AllPosts from "../Posts";

const BlogRootComp = () => {
  const { Content, Footer } = Layout;

  const { setAllPosts, allPosts, pageNumber, setPageNumber, setCategories } =
    useContext(BlogCtx);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const fetchedPosts = await getAllPosts(pageNumber);
      setAllPosts([...fetchedPosts.data]);
      // setAllPosts([...allPosts, ...fetchedPosts.data]);
      setIsLastPage(fetchedPosts.isLastPage);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllCategories = async () => {
    const data = await fetchCategories();
    if (data.status === 200) {
      setCategories(data.data);
    }
  };

  // const handleScroll = () => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop !==
  //       document.documentElement.offsetHeight ||
  //     isLoading
  //   ) {
  //     return;
  //   }

  //   if (isLastPage) {
  //     return;
  //   }
  //   setIsScrolled(true);
  //   fetchPosts().then(() => {
  //     window.scrollBy(0, 2);
  //     setIsScrolled(false);
  //   });
  // };

  useEffect(() => {
    fetchPosts();
    fetchAllCategories();
  }, []);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [isLoading]);

  // useEffect(() => {
  //   if (isScrolled) {
  //     setPageNumber(pageNumber + 1);
  //   }
  // }, [isScrolled]);

  return (
    <div>
      <Layout>
        <Content>
          <div>
            <AllPosts allPosts={allPosts} isLoading={isLoading} />
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
