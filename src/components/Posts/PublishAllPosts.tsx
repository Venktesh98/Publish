"use client";
import { BlogCtx } from "@/context/blogContext";
import { IAllComments } from "@/interfaces/commentsInterface";
import {
  IAllPosts,
  IAllPostsProps,
  IUserDetails,
} from "@/interfaces/postsInterface";
import {
  blockUser,
  deleteAPost,
  fetchAllUsers,
  followAUser,
  getAllPosts,
  likePost,
  unBlockUser,
  unFollowAUser,
  unLikePost,
} from "@/services/services";
import { UserEnumValues } from "@/utils/constants";
import { serializeDate } from "@/utils/helpers";
import {
  CheckCircleTwoTone,
  CommentOutlined,
  HeartFilled,
  HeartOutlined,
  MoreOutlined,
  StopTwoTone,
  UserOutlined,
} from "@ant-design/icons";
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
import ConfirmBox from "../shared/ConfirmationDialog";
import ImageControl from "../shared/ImageControl";
import PopOverControl from "../shared/PopOverControl";
import Comments from "./Comments";
import styles from "./posts.module.css";

const PublishAllPosts = ({ isLoading }: IAllPostsProps) => {
  const { Title, Text } = Typography;

  const {
    allPosts,
    setAllPosts,
    pageNumber,
    setIsModalOpen,
    userDetails,
    setUserDetails,
    setSinglePostDetails,
    setIsEditMode,
  } = useContext(BlogCtx);

  const { id: userId } = useParams();
  const router = useRouter();

  const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false);
  const [postId, setPostId] = useState<string>("");
  const { allUsers, userDetails: loggedInUserDetails } = useContext(BlogCtx);

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

  const handleBlockUser = async (userId: string) => {
    try {
      const data = await blockUser(userId);
      if (data.status === 200) {
        const allUsersDetails = await fetchAllUsers();

        const loggedInUserDetails = allUsersDetails.find(
          (userObj: IUserDetails) =>
            userObj._id === sessionStorage.getItem("userId")
        );
        setUserDetails(loggedInUserDetails);

        const fetchedPosts = await getAllPosts(pageNumber);
        setAllPosts(fetchedPosts.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnBlockUser = async (userId: string) => {
    try {
      const data = await unBlockUser(userId);
      if (data.status === 200) {
        const allUsersDetails = await fetchAllUsers();

        const loggedInUserDetails = allUsersDetails.find(
          (userObj: IUserDetails) =>
            userObj._id === sessionStorage.getItem("userId")
        );
        setUserDetails(loggedInUserDetails);

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

  const commentedUserDetails = (commentedUser: string) => {
    const userDetails = allUsers.find(
      (commentedUserObj: IUserDetails) => commentedUserObj._id === commentedUser
    );
    return {
      photo: userDetails.profilePhoto,
      name: userDetails.fullName,
    };
  };

  const findBlockedUsers = (blockedUserId: string) => {
    return loggedInUserDetails.blockedUsers.includes(blockedUserId);
  };

  const showLikesAndUnLikes = (postItem: IAllPosts) => {
    return (
      <Button type="text">
        <span className={styles.likeUnlike}>
          <HeartFilled
            style={{ color: "#ed0909ad" }}
            onClick={() => handleLike(postItem)}
          />
          {postItem.likesCount}
        </span>

        <span className={styles.likeUnlike}>
          <HeartOutlined onClick={() => handleUnLike(postItem)} />
          {postItem.disLikesCount}
        </span>
      </Button>
    );
  };

  const allComments = (postDetails: IAllPosts) => {
    return postDetails.comments.length <= 2 ? (
      <div className={styles.userCommentsContainer}>
        {postDetails.comments.map((comment) => (
          <div className={styles.userComments} key={comment._id}>
            <div>
              <ImageControl
                src={
                  commentedUserDetails(comment.user as unknown as string).photo
                }
                width={30}
                height={30}
                alt="No Image"
                photo={
                  commentedUserDetails(comment.user as unknown as string).photo
                }
                isCircle={true}
              />
            </div>
            <div className={styles.commentsStyle}>
              <div>
                {commentedUserDetails(comment.user as unknown as string).name}
              </div>
              {comment.description}
            </div>
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
              <div className={styles.commentsStyle}>
                <div>
                  {
                    commentedUserDetails(commentObj.user as unknown as string)
                      .name
                  }
                </div>
                {commentObj.description}
              </div>
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
    if (userDetails?.followers?.includes(userId as string)) {
      return (
        <div className={styles.popOverContent}>
          {userDetails?._id !== userId && (
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
          {userDetails?._id !== userId && (
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

  const handleLike = async (postDetails: IAllPosts) => {
    if (postDetails.likes.includes(userId as string)) {
      return;
    }

    const data = await likePost(postDetails._id);
    if (data.status === 200) {
      const fetchedPosts = await getAllPosts(pageNumber);
      setAllPosts(fetchedPosts.data);
    }
  };

  const handleUnLike = async (postDetails: IAllPosts) => {
    if (postDetails.disLikes.includes(userId as string)) {
      return;
    }

    const data = await unLikePost(postDetails._id);
    if (data.status === 200) {
      const fetchedPosts = await getAllPosts(pageNumber);
      setAllPosts(fetchedPosts.data);
    }
  };

  const menuItemContent = (postItem: IAllPosts) => {
    return (
      <div className={styles.menuItemContents}>
        <p onClick={() => handleEdit(postItem)}>Edit</p>
        <p>
          <ConfirmBox
            title="Delete Post"
            description="Are you sure you want to delete this post?"
            handleConfirm={() => handleDeletePost(postItem._id)}
            handleConfirmCancel={() => {}}
          >
            Delete
          </ConfirmBox>
        </p>
      </div>
    );
  };

  let content;

  if (isLoading) {
    content = (
      <Space direction="vertical" style={{ display: "flex" }} size={"small"}>
        {Array.from([1, 2, 3, 4, 5, 6]).map((_, index) => (
          <Card key={index}>
            <Skeleton.Image
              active={true}
              style={{ width: 610, height: 350, marginBottom: "12px" }}
            />
            <Skeleton active={true} avatar paragraph={{ rows: 3 }} />
          </Card>
        ))}
      </Space>
    );
  } else if (!allPosts.length) {
    content = (
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{ height: 100, textAlign: "center" }}
      >
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Create Now
        </Button>
      </Empty>
    );
  } else {
    content = allPosts.map((postItem: IAllPosts) => (
      <div key={postItem.id}>
        <Card style={{ marginBottom: "8px" }}>
          <ImageControl
            src={postItem.photo ?? "/"}
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
                <Text type="secondary" className={styles.userStyle}>
                  {`${serializeDate(postItem?.createdAt).formattedDate} (${
                    postItem?.daysAgo
                  })`}
                </Text>
              </div>
            </div>
            {userDetails?._id === postItem.user._id ? (
              <div className={styles.menuItem}>
                <Popover
                  placement="bottom"
                  content={() => menuItemContent(postItem)}
                  arrow={false}
                >
                  <MoreOutlined />
                </Popover>
              </div>
            ) : (
              <>
                {findBlockedUsers(postItem.user._id) ? (
                  <div
                    className={styles.blocked}
                    onClick={() => handleUnBlockUser(postItem.user._id)}
                  >
                    <div>
                      <CheckCircleTwoTone />
                    </div>
                    <div>Unblock</div>
                  </div>
                ) : (
                  <div
                    className={styles.blocked}
                    onClick={() => handleBlockUser(postItem.user._id)}
                  >
                    <div>
                      <StopTwoTone />
                    </div>
                    <div>Block</div>
                  </div>
                )}
              </>
            )}
          </div>
          <div className={styles.postInfoContainer}>
            <Title level={3} className={styles.title}>
              <span
                onClick={() => handleRedirectToDetailsPage(postItem._id, false)}
              >
                {postItem.title}
              </span>
            </Title>
            <div className={styles.commentsContainer}>
              {postItem?.comments?.length ? (
                <div>
                  <Button
                    type="text"
                    onClick={() =>
                      handleRedirectToDetailsPage(postItem._id, true)
                    }
                  >
                    <CommentOutlined /> {showComments(postItem?.comments)}
                  </Button>

                  {showLikesAndUnLikes(postItem)}
                </div>
              ) : (
                <>
                  <Button
                    type="text"
                    onClick={() => handleOpenCommentWindow(postItem._id)}
                  >
                    <CommentOutlined /> Add Comment
                  </Button>

                  {showLikesAndUnLikes(postItem)}
                </>
              )}
            </div>
            {allComments(postItem)}
          </div>
        </Card>
      </div>
    ));
  }

  return (
    <div>
      {content}

      <Comments
        setIsCommentModalOpen={setIsCommentModalOpen}
        isCommentModalOpen={isCommentModalOpen}
        postId={postId}
      />
    </div>
  );
};

export default PublishAllPosts;
