"use client";

<<<<<<< Updated upstream
import { IAllPostsProps, IUserDetails } from "@/interfaces/postsInterface";
import { serializeDate } from "@/utils/helpers";
import { CommentOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Typography } from "antd";
import ImageControl from "../shared/ImageControl";
import PopOverControl from "../shared/PopOverControl";
import LeftPanel from "./LeftPanel";
=======
import { IAllPostsProps } from "@/interfaces/postsInterface";
import LeftPanel from "../LeftPanel";
import RightPanel from "../RightPanel";
import PublishAllPosts from "./PublishAllPosts";
>>>>>>> Stashed changes
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
