"use client";
import { IAllPostsProps, IUserDetails } from "@/interfaces/postsInterface";
import { followAUser, unFollowAUser } from "@/services/services";
import { serializeDate } from "@/utils/helpers";
import { CommentOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Skeleton, Space, Typography } from "antd";
import { useParams } from "next/navigation";
import { useState } from "react";
import ImageControl from "../shared/ImageControl";
import PopOverControl from "../shared/PopOverControl";
import styles from "./posts.module.css";
import { UserEnumValues } from "@/utils/constants";

const PublishAllPosts = ({ allPosts, isLoading }: IAllPostsProps) => {
  const { Title, Text } = Typography;

  const [isUserFollowed, setIsUserFollowed] = useState<boolean>(false);
  const [userWhoFollowed, setUserWhoFollowed] = useState("");

  const { id } = useParams();
  let isUserAFollower;

  const handleFollowAUser = async (userIdOfUserToFollow: string) => {
    try {
      const data = await followAUser(userIdOfUserToFollow);
      if (data.status === 200) {
        setIsUserFollowed(true);
        setUserWhoFollowed(userIdOfUserToFollow);
        showFollowUnFollowBtn(userIdOfUserToFollow, "");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnFollowAUser = async (userIdOfUserToUnFollow: string) => {
    console.log("In unfollow");
    try {
      const data = await unFollowAUser(userIdOfUserToUnFollow);
      if (data.status === 200) {
        setIsUserFollowed(false);
        setUserWhoFollowed(userIdOfUserToUnFollow);
        showFollowUnFollowBtn(userIdOfUserToUnFollow, "");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const showComments = (comments: string[]) => {
    if (comments.length > 1) {
      return `${comments.length} comments`;
    }
    return `${comments.length} comment`;
  };

  const popOverContent = (userDetails: IUserDetails) => {
    if (
      userDetails?._id !== id &&
      userDetails?.followers?.includes(id as string)
    ) {
      isUserAFollower = UserEnumValues.UNFOLLOW;
    } else {
      isUserAFollower = UserEnumValues.FOLLOW;
    }

    return (
      <div className={styles.popOverContent}>
        {userDetails?._id !== id &&
          showFollowUnFollowBtn(userDetails?._id, isUserAFollower)}

        <div>
          <div className={styles.joined}>JOINED</div>
          <div>
            {serializeDate(userDetails?.createdAt).formattedDateWithYear}
          </div>
        </div>
      </div>
    );
  };

  const showFollowUnFollowBtn = (userId: string, text: string) => {
    return (
      <Button className={styles.followBtn} type="primary">
        {isUserFollowed && userId === userWhoFollowed ? (
          <span onClick={() => handleUnFollowAUser(userId)}>
            {UserEnumValues.UNFOLLOW}
          </span>
        ) : !isUserFollowed && userId === userWhoFollowed ? (
          <span onClick={() => handleFollowAUser(userId)}>
            {UserEnumValues.FOLLOW}
          </span>
        ) : (
          <span
            onClick={
              text === UserEnumValues.UNFOLLOW
                ? () => handleUnFollowAUser(userId)
                : () => handleFollowAUser(userId)
            }
          >
            {text}
          </span>
        )}
      </Button>
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
                src={postItem?.photo ?? "/"}
                // layout="responsive"
                alt=""
                width={610}
                height={370}
                photo={postItem?.photo}
              />
              <div>
                <div className={styles.userImageContainer}>
                  {postItem?.user?.profilePhoto ? (
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
                        title={postItem?.user?.fullName}
                        content={popOverContent(postItem?.user)}
                      >
                        {postItem?.user?.fullName}
                      </PopOverControl>
                    </Text>
                    <Text type="secondary" className={styles.userStyle}>{`${
                      serializeDate(postItem?.createdAt).formattedDate
                    } (${postItem?.daysAgo})`}</Text>
                  </div>
                </div>
              </div>

              <div className={styles.postInfoContainer}>
                <Title level={4}>{postItem.title}</Title>

                <div className={styles.commentsContainer}>
                  {postItem?.comments?.length ? (
                    <Button type="text">
                      <CommentOutlined /> {showComments(postItem?.comments)}
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
