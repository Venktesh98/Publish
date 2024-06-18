"use client";

import { IAllPostsProps, IUserDetails } from "@/interfaces/postsInterface";
import { serializeDate } from "@/utils/helpers";
import { CommentOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Typography } from "antd";
import ImageControl from "../shared/ImageControl";
import PopOverControl from "../shared/PopOverControl";
import LeftPanel from "./LeftPanel";
import styles from "./posts.module.css";

const AllPosts = ({ allPosts }: IAllPostsProps) => {
  const { Title, Text } = Typography;

  const showComments = (comments: string[]) => {
    if (comments.length > 1) {
      return `${comments.length} comments`;
    }
    return `${comments.length} comment`;
  };

  const popOverContent = (userDetails: IUserDetails) => {
    return (
      <div className={styles.popOverContent}>
        <Button className={styles.followBtn} type="primary">
          Follow
        </Button>

        <div>
          <div className={styles.joined}>JOINED</div>
          <div>
            {serializeDate(userDetails.createdAt).formattedDateWithYear}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className={styles.allPostsContainer}>
      <div className={styles.leftPanel}>
        <LeftPanel />
      </div>

      <div className={styles.middlePanel}>
        {allPosts.map((postItem) => (
          <Card key={postItem.id}>
            <ImageControl
              src={postItem.photo ?? "/"}
              layout="responsive"
              alt=""
              width={550}
              height={350}
              photo={postItem.photo}
            />
            <div>
              <div className={styles.userImageContainer}>
                {postItem.user.profilePhoto ? (
                  <ImageControl
                    src={postItem.user.profilePhoto ?? "/"}
                    alt=""
                    width={40}
                    height={40}
                    photo={postItem.user.profilePhoto}
                    isCircle={true}
                  />
                ) : (
                  <div className={styles.avatar}>
                    <Avatar size={40} icon={<UserOutlined />} />
                  </div>
                )}

                <div className={styles.userDetailsContainer}>
                  <Text strong className={styles.userStyle}>
                    <PopOverControl
                      title={postItem.user.fullName}
                      content={popOverContent(postItem?.user)}
                    >
                      {postItem.user.fullName}
                    </PopOverControl>
                  </Text>
                  <Text type="secondary" className={styles.userStyle}>{`${
                    serializeDate(postItem.createdAt).formattedDate
                  } (${postItem.daysAgo})`}</Text>
                </div>
              </div>
            </div>

            <div className={styles.postInfoContainer}>
              <Title level={4}>{postItem.title}</Title>

              <div className={styles.commentsContainer}>
                {postItem.comments.length ? (
                  <Button type="text">
                    <CommentOutlined /> {showComments(postItem.comments)}
                  </Button>
                ) : (
                  <Button type="text">
                    <CommentOutlined /> Add Comment
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className={styles.rightPanel}></div>
    </section>
  );
};

export default AllPosts;
