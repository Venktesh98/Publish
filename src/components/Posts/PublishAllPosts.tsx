"use client";
import { BlogCtx } from "@/context/blogContext";
import { IAllComments } from "@/interfaces/commentsInterface";
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
  Popover,
  Skeleton,
  Space,
  Typography,
  message,
} from "antd";
import { useParams, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import ImageControl from "../shared/ImageControl";
import PopOverControl from "../shared/PopOverControl";
import Comments from "./Comments";
import styles from "./posts.module.css";
import ConfirmBox from "../shared/ConfirmationDialog";

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
  const router = useRouter();

  const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false);
  const [postId, setPostId] = useState<string>("");

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

  const showComments = (comments: IAllComments[]) => {
    if (comments.length > 1) {
      return `${comments.length} comments`;
    }
    return `${comments.length} comment`;
  };

  const allComments = (postDetails: IAllPosts) => {
    return postDetails.comments.length <= 2 ? (
      <div className={styles.userCommentsContainer}>
        {postDetails.comments.map((comment) => (
          <div className={styles.userComments} key={comment._id}>
            <div>
              <ImageControl
                src={postDetails.user.profilePhoto}
                width={30}
                height={30}
                alt="No Image"
                photo={postDetails.user.profilePhoto}
                isCircle={true}
              />
            </div>
            <div className={styles.comments}>{comment.description}</div>
          </div>
        ))}
      </div>
    ) : (
      <div>
        <div className={styles.userCommentsContainer}>
          {postDetails.comments.slice(0, 2).map((commentObj) => (
            <div className={styles.userComments} key={postDetails._id}>
              <div>
                <ImageControl
                  src={postDetails.user.profilePhoto}
                  width={30}
                  height={30}
                  alt="No Image"
                  photo={postDetails.user.profilePhoto}
                  isCircle={true}
                />
              </div>
              <div className={styles.comments}>{commentObj.description}</div>
            </div>
          ))}
        </div>

        <div
          className={styles.seeAllComments}
          onClick={() => handleRedirectToDetailsPage(postDetails._id, true)}
        >
          See all {postDetails.comments.length} comments
        </div>
      </div>
    );
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

  const handleOpenCommentWindow = (postId: string) => {
    setIsCommentModalOpen(true);
    setPostId(postId);
  };

  const handleRedirectToDetailsPage = (
    postId: string,
    isShowComments: boolean
  ) => {
    return isShowComments
      ? router.push(`/post/${postId}?comments=show`)
      : router.push(`/post/${postId}`);
  };

  const menuItemContent = (postItem: IAllPosts) => {
    return (
      <div className={styles.menuItemContents}>
        <p onClick={() => handleEdit(postItem)}>Edit</p>
        <p>
          <ConfirmBox
            title="Delete Comment"
            description="Are you sure you want to delete the comment?"
            handleConfirm={() => handleDeletePost(postItem._id)}
            handleConfirmCancel={() => {}}
          >
            Delete
          </ConfirmBox>
        </p>
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
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: 60 }}
        >
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            Create Now
          </Button>
        </Empty>
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
                  {(postItem?.user as IUserDetails)?.profilePhoto ? (
                    <ImageControl
                      src={(postItem.user as IUserDetails).profilePhoto ?? "/"}
                      alt=""
                      width={40}
                      height={40}
                      photo={(postItem.user as IUserDetails).profilePhoto}
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
                        title={(postItem?.user as IUserDetails)?.fullName}
                        content={popOverContent(postItem?.user as IUserDetails)}
                      >
                        {(postItem?.user as IUserDetails)?.fullName}
                      </PopOverControl>
                    </Text>
                    <Text type="secondary" className={styles.userStyle}>{`${
                      serializeDate(postItem?.createdAt).formattedDate
                    } (${postItem?.daysAgo})`}</Text>
                  </div>
                </div>

                {userDetails?._id === (postItem.user as IUserDetails)._id && (
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
                <Title
                  level={3}
                  className={styles.title}
                  onClick={() =>
                    handleRedirectToDetailsPage(postItem._id, false)
                  }
                >
                  {postItem.title}
                </Title>

                <div className={styles.commentsContainer}>
                  {postItem?.comments?.length ? (
                    <Button
                      type="text"
                      onClick={() =>
                        handleRedirectToDetailsPage(postItem._id, true)
                      }
                    >
                      <CommentOutlined /> {showComments(postItem?.comments)}
                    </Button>
                  ) : (
                    <Button
                      type="text"
                      onClick={() => handleOpenCommentWindow(postItem._id)}
                    >
                      <CommentOutlined /> Add Comment
                    </Button>
                  )}
                </div>

                {allComments(postItem)}
              </div>
            </Card>
          </div>
        ))
      )}

      <Comments
        setIsCommentModalOpen={setIsCommentModalOpen}
        isCommentModalOpen={isCommentModalOpen}
        postId={postId}
      />
    </div>
  );
};

export default PublishAllPosts;
