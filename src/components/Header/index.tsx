"use client";
import { BlogCtx } from "@/context/blogContext";
import { fetchCategories, getAllPosts } from "@/services/services";
import { Card, Divider, Layout, Skeleton } from "antd";
import { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AllPosts from "../Posts";

const BlogRootComp = () => {
  const { Content, Footer } = Layout;

  const { setAllPosts, allPosts, setCategories } = useContext(BlogCtx);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [pn] = useState(0);

  const fetchPosts = async (pn: number) => {
    setIsLoading(true);
    try {
      const fetchedPosts = await getAllPosts(pn);
      setAllPosts([...allPosts, ...fetchedPosts.data]);
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

  useEffect(() => {
    fetchPosts(pn);
    fetchAllCategories();
  }, []);

  return (
    <div>
      <Layout>
        <Content>
          <div>
            <InfiniteScroll
              dataLength={allPosts.length}
              next={() => fetchPosts(pn + 1)}
              hasMore={!isLastPage}
              loader={
                <Card>
                  <Skeleton.Image
                    active={true}
                    style={{ width: 610, height: 350, marginBottom: "12px" }}
                  />
                  <Skeleton active={true} avatar paragraph={{ rows: 3 }} />
                </Card>
              }
              scrollableTarget="window"
            >
              <AllPosts allPosts={allPosts} isLoading={isLoading} />
            </InfiniteScroll>
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
