"use client";
import { IAllPostsProps } from "@/interfaces/postsInterface";
import LeftPanel from "../LeftPanel";
import RightPanel from "../RightPanel";
import PublishAllPosts from "./PublishAllPosts";
import styles from "./posts.module.css";

const AllPosts = ({ allPosts, isLoading }: IAllPostsProps) => {
  return (
    <section className={styles.allPostsContainer}>
      <div className={styles.leftPanel}>
        <LeftPanel />
      </div>

      <div className={styles.middlePanel}>
        <PublishAllPosts allPosts={allPosts} isLoading={isLoading} />
      </div>

      <div className={styles.rightPanel}>
        <RightPanel />
      </div>
    </section>
  );
};

export default AllPosts;
