"use client";
import ConfirmBox from "@/components/shared/ConfirmationDialog";
import DrawerWindow from "@/components/shared/Drawer";
import HeaderLayout from "@/components/shared/HeaderLayout";
import ImageControl from "@/components/shared/ImageControl";
import { BlogCtx } from "@/context/blogContext";
import { ICommentsPayload } from "@/interfaces/commentsInterface";
import { IAllPosts, IUserDetails } from "@/interfaces/postsInterface";
import {
  addNewComment,
  deleteComment,
  editComment,
  fetchAllUsers,
  followAUser,
  getAllPosts,
  getPostDetails,
  unFollowAUser,
} from "@/services/services";
import { UserEnumValues } from "@/utils/constants";
import { serializeDate } from "@/utils/helpers";
import { CommentOutlined, DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Card, Form, Typography } from "antd";
import parse from "html-react-parser";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useEffect, useMemo, useState } from "react";
import RichTextEditor from "../Editor";
import styles from "./postDetails.module.css";

const PostDetails = () => {
  const { postId } = useParams();
  const searchParams = useSearchParams();

  const { allUsers, userDetails, setUserDetails, allPosts, setAllPosts } =
    useContext(BlogCtx);

  const [postDetails, setPostDetails] = useState<IAllPosts | null>(null);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [comments, setComments] = useState<ICommentsPayload>({
    description: " ",
  });
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<string>("");
  const [value, setValue] = useState<string>("");

  const { Title } = Typography;
  const handleFollowAUser = async (userIdOfUserToFollow: string) => {
    try {
      const data = await followAUser(userIdOfUserToFollow);
      if (data.status === 200) {
        const allUsersDetails = await fetchAllUsers();

        const loggedInUserDetails = allUsersDetails.find(
          (userObj: IUserDetails) =>
            userObj._id === sessionStorage.getItem("userId")
        );
        setUserDetails(loggedInUserDetails);
        fetchPostDetails();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnFollowAUser = async (userIdOfUserToUnFollow: string) => {
    try {
      const data = await unFollowAUser(userIdOfUserToUnFollow);
      if (data.status === 200) {
        const allUsersDetails = await fetchAllUsers();

        const loggedInUserDetails = allUsersDetails.find(
          (userObj: IUserDetails) =>
            userObj._id === sessionStorage.getItem("userId")
        );
        setUserDetails(loggedInUserDetails);
        fetchPostDetails();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddNewOrEditComment = async () => {
    const payload = {
      description: comments.description,
      descriptionHtml: value,
    };

    if (isEditMode && commentId.length > 0) {
      const data = await editComment(commentId, payload);

      if (data.status === 200) {
        fetchPostDetails();
      }
    } else {
      const data = await addNewComment(postId as string, payload);
      if (data.status === 200) {
        fetchPostDetails();
      }
    }
    setComments({
      ...comments,
      description: "",
    });
    setValue("");
  };

  const handleDeleteComment = async (commentId: string) => {
    const data = await deleteComment(commentId);
    if (data.status === 200) {
      fetchPostDetails();
    }
  };

  const handleEditComment = async (
    commentId: string,
    description: string,
    descriptionHtml: string
  ) => {
    setIsEditMode(true);
    setComments({
      ...comments,
      description: description,
    });
    setCommentId(commentId);
    setValue(descriptionHtml);
  };

  const fetchPostDetails = async () => {
    const data = await getPostDetails(postId as string);
    if (data.status === 200) {
      setPostDetails(data.data);
      const fetchedPosts = await getAllPosts(0);
      setAllPosts([...fetchedPosts.data]);
    }
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
    if (isEditMode) setIsEditMode(false);
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  useEffect(() => {
    if (searchParams.size > 0) {
      setOpenDrawer(true);
    }
  }, [searchParams.size]);

  const postUserDetails = useMemo(() => {
    return (
      postDetails !== undefined &&
      allUsers?.find((user: any) => user._id === postDetails?.user)
    );
  }, [allUsers, postDetails]);

  return (
    <section>
      <HeaderLayout />

      <div className={styles.postDetailsContainer}>
        <Card className={styles.postDetailsCard}>
          <div className={styles.postTitle}>{postDetails?.title}</div>

          <div className={styles.userDetailsContainer}>
            <div className={styles.userDetailsWrapper}>
              <div className={styles.userContents}>
                <ImageControl
                  src={postUserDetails?.profilePhoto}
                  height={50}
                  width={50}
                  isCircle={true}
                  alt="No Image"
                  photo={postUserDetails?.profilePhoto}
                />
              </div>
              <div>
                <div className={styles.userName}>
                  {postUserDetails?.fullName}
                </div>
                <div className={styles.dateContainer}>
                  {postUserDetails?.createdAt?.length > 0 &&
                    serializeDate(postUserDetails?.createdAt)
                      .formattedDateWithYear}
                </div>
              </div>
            </div>

            {postUserDetails?._id !== userDetails?._id && (
              <div className={styles.userActions}>
                <div>
                  {userDetails?.following?.includes(postDetails?.user) ? (
                    <Button
                      type="primary"
                      size="small"
                      onClick={() =>
                        handleUnFollowAUser(
                          postDetails?.user as unknown as string
                        )
                      }
                    >
                      {UserEnumValues.UNFOLLOW}
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      size="small"
                      onClick={() =>
                        handleFollowAUser(
                          postDetails?.user as unknown as string
                        )
                      }
                    >
                      {UserEnumValues.FOLLOW}
                    </Button>
                  )}
                </div>
              </div>
            )}

            <div onClick={() => setOpenDrawer(true)}>
              <CommentOutlined
                style={{ fontSize: "19px", cursor: "pointer" }}
              />
            </div>
          </div>

          <div>
            {postDetails && parse(postDetails?.descriptionHtmlText as string)}
          </div>
        </Card>
      </div>

      <DrawerWindow
        drawerPlacement="right"
        openDrawer={openDrawer}
        title={`Comments`}
        onClose={onCloseDrawer}
      >
        <Form onFinish={handleAddNewOrEditComment}>
          <div className={styles.commentsContainer}>
            <div>
              <RichTextEditor
                setNewPost={setComments}
                newPost={comments}
                setValue={setValue}
                value={value}
              />
            </div>

            <div className={styles.addNewComment}>
              <Button
                htmlType="submit"
                type="primary"
                disabled={!comments.description.length}
              >
                {isEditMode ? "Update Comment" : "Add Comment"}
              </Button>
            </div>
          </div>
        </Form>

        <div className={styles.mostRecentMainContainer}>
          <div className={styles.mostRecentContainer}>
            <Title level={5}>Most Recent</Title>
            <div className={styles.recentLine}></div>
          </div>

          <div>
            {postDetails?.comments.map((commentObj) => (
              <>
                <div className={styles.commentedUser}>
                  <div>
                    <ImageControl
                      src={commentObj?.user?.profilePhoto}
                      height={35}
                      width={35}
                      isCircle={true}
                      alt="No Image"
                      photo={commentObj?.user?.profilePhoto}
                    />
                  </div>

                  <div className={styles.commentedUserDetails}>
                    <div className={styles.commentedUserName}>
                      {commentObj?.user.fullName}
                      <span>
                        {
                          serializeDate(commentObj.createdAt)
                            .formattedDateWithTime
                        }
                      </span>
                    </div>

                    <div>
                      {commentObj.descriptionHtml?.length === 0 ||
                      commentObj.descriptionHtml === undefined
                        ? commentObj.description
                        : parse(commentObj.descriptionHtml)}
                    </div>
                  </div>
                </div>

                <div className={styles.comments}>
                  <div>
                    {commentObj?.user._id ===
                      sessionStorage.getItem("userId") && (
                      <>
                        <ConfirmBox
                          title="Delete Comment"
                          description="Are you sure you want to delete this comment?"
                          handleConfirm={() =>
                            handleDeleteComment(commentObj._id)
                          }
                          handleConfirmCancel={() => {}}
                        >
                          <DeleteTwoTone />
                        </ConfirmBox>

                        <span>
                          <EditTwoTone
                            onClick={() =>
                              handleEditComment(
                                commentObj._id,
                                commentObj.description,
                                commentObj.descriptionHtml
                              )
                            }
                          />
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </DrawerWindow>
    </section>
  );
};

export default PostDetails;
