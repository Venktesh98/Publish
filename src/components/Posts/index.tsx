"use client";
import { IAllPostsProps } from "@/interfaces/postsInterface";
import PublishAllPosts from "./PublishAllPosts";
import styles from "./posts.module.css";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

const AllPosts = ({ isLoading }: IAllPostsProps) => {
  return (
    <section className={styles.allPostsContainer}>
      <div className={styles.leftPanel}>
        <LeftPanel />
      </div>

      <div className={styles.middlePanel}>
        <PublishAllPosts isLoading={isLoading} />
      </div>

      <div className={styles.rightPanel}>
        <RightPanel />
      </div>
    </section>
  );
};

export default AllPosts;
