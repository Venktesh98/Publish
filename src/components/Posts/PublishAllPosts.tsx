"use client";
import { IAllPostsProps, IUserDetails } from "@/interfaces/postsInterface";
import { fetchAllUsers, followAUser } from "@/services/services";
import { serializeDate } from "@/utils/helpers";
import { CommentOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Skeleton, Space, Typography } from "antd";
import ImageControl from "../shared/ImageControl";
import PopOverControl from "../shared/PopOverControl";
import styles from "./posts.module.css";
import { useState } from "react";

const PublishAllPosts = ({ allPosts, isLoading }: IAllPostsProps) => {
  const { Title, Text } = Typography;

  // const [isUserAFollower, setIsUserAFollower] = useState<boolean>(false);

  // const handleFollowAUser = async (userId: string) => {
  //   try {
  //     const data = await followAUser(userId);
  //     if (data.status === 200) {
  //       // fetch all users
  //       // const usersData = await fetchAllUsers();
  //       // look for the loggedIn user
  //       // const isUserAFollower = usersData.some((userObj: IUserDetails) =>
  //       //   userObj.followers.includes(userId)
  //       // );
  //       // check the user who we followed
  //       // once found check the loggedIn user id exists in the followers array
  //       // setIsUserAFollower(isUserAFollower);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const showComments = (comments: string[]) => {
    if (comments.length > 1) {
      return `${comments.length} comments`;
    }
    return `${comments.length} comment`;
  };

  const popOverContent = (userDetails: IUserDetails) => {
    return (
      <div className={styles.popOverContent}>
        <Button
          className={styles.followBtn}
          type="primary"
          // onClick={() => handleFollowAUser(userDetails._id)}
        >
          {/* {isUserAFollower ? "Follow" : "Unfollow"} */}
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
    <div>
      {isLoading ? (
        <Space direction="vertical" style={{ display: "flex" }} size={"small"}>
          {Array.from([1, 2, 3, 4, 5, 6]).map((_, index) => (
            <Card key={index}>
              <Skeleton active={true} avatar paragraph={{ rows: 3 }} />
            </Card>
          ))}
        </Space>
      ) : (
        allPosts.map((postItem) => (
          <div key={postItem.id}>
            <Card style={{ marginBottom: "8px" }}>
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
          </div>
        ))
      )}
    </div>
  );
};

export default PublishAllPosts;
