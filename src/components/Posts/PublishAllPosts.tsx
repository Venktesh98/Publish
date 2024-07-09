"use client";
import { BlogCtx } from "@/context/blogContext";
import {
  IAllPosts,
  IAllPostsProps,
  IUserDetails,
} from "@/interfaces/postsInterface";
import {
  deleteAPost,
  followAUser,
  getAllPosts,
  unFollowAUser,
} from "@/services/services";
import { UserEnumValues } from "@/utils/constants";
import { serializeDate } from "@/utils/helpers";
import { CommentOutlined, MoreOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Empty,
  Menu,
  Popover,
  Skeleton,
  Space,
  Typography,
  message,
} from "antd";
import { useParams } from "next/navigation";
import { useContext, useState } from "react";
import ImageControl from "../shared/ImageControl";
import PopOverControl from "../shared/PopOverControl";
import styles from "./posts.module.css";

const PublishAllPosts = ({ isLoading }: IAllPostsProps) => {
  const { Title, Text } = Typography;

  const {
    allPosts,
    setAllPosts,
    pageNumber,
    setIsModalOpen,
    userDetails,
    setSinglePostDetails,
    setIsEditMode,
  } = useContext(BlogCtx);

  const { id } = useParams();

  const handleFollowAUser = async (userIdOfUserToFollow: string) => {
    try {
      const data = await followAUser(userIdOfUserToFollow);
      if (data.status === 200) {
        const fetchedPosts = await getAllPosts(pageNumber);
        setAllPosts(fetchedPosts.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnFollowAUser = async (userIdOfUserToUnFollow: string) => {
    try {
      const data = await unFollowAUser(userIdOfUserToUnFollow);
      if (data.status === 200) {
        const fetchedPosts = await getAllPosts(pageNumber);
        setAllPosts(fetchedPosts.data);
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

  const formatJoinedDate = (userDetails: IUserDetails) => {
    return (
      <div>
        <div className={styles.joined}>JOINED</div>
        <div>{serializeDate(userDetails?.createdAt).formattedDateWithYear}</div>
      </div>
    );
  };

  const popOverContent = (userDetails: IUserDetails) => {
    if (userDetails?.followers?.includes(id as string)) {
      return (
        <div className={styles.popOverContent}>
          {userDetails?._id !== id && (
            <Button
              type="primary"
              className={styles.followBtn}
              onClick={() => handleUnFollowAUser(userDetails._id)}
            >
              {UserEnumValues.UNFOLLOW}
            </Button>
          )}
          {formatJoinedDate(userDetails)}
        </div>
      );
    } else {
      return (
        <div className={styles.popOverContent}>
          {userDetails?._id !== id && (
            <Button
              type="primary"
              className={styles.followBtn}
              onClick={() => handleFollowAUser(userDetails._id)}
            >
              {UserEnumValues.FOLLOW}
            </Button>
          )}

          {formatJoinedDate(userDetails)}
        </div>
      );
    }
  };

  const handleDeletePost = async (postId: string) => {
    const data = await deleteAPost(postId);
    if (data.status === 200) {
      message.success("Post Deleted");
      const fetchedPosts = await getAllPosts(pageNumber);
      setAllPosts(fetchedPosts.data);
    }
  };

  const handleEdit = (postDetails: IAllPosts) => {
    setSinglePostDetails(postDetails);
    setIsModalOpen(true);
    setIsEditMode(true);
  };

  const menuItemContent = (postItem: IAllPosts) => {
    return (
      <div className={styles.menuItemContents}>
        <p onClick={() => handleEdit(postItem)}>Edit</p>
        <p onClick={() => handleDeletePost(postItem._id)}>Delete</p>
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
      ) : !allPosts ? (
        <>
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 60 }}
          >
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              Create Now
            </Button>
          </Empty>
        </>
      ) : (
        allPosts.map((postItem: IAllPosts) => (
          <div key={postItem.id}>
            <Card style={{ marginBottom: "8px" }}>
              <ImageControl
                src={postItem.photo ?? "/"}
                // layout="responsive"
                alt=""
                width={610}
                height={350}
                photo={postItem.photo}
              />
              <div className={styles.userSectionMain}>
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

                {userDetails?._id === postItem.user._id && (
                  <div className={styles.menuItem}>
                    <Popover
                      placement="bottom"
                      content={() => menuItemContent(postItem)}
                      arrow={false}
                    >
                      <MoreOutlined />
                    </Popover>
                  </div>
                )}
              </div>

              <div className={styles.postInfoContainer}>
                <Title level={3}>{postItem.title}</Title>

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
