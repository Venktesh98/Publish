"use client";
import RichTextEditor from "@/components/Posts/Editor";
import ModalWindow from "@/components/shared/Modal";
import PopOverControl from "@/components/shared/PopOverControl";
import { BlogCtx } from "@/context/blogContext";
import { INewPostPayload } from "@/interfaces/createPostInterface";
import {
  IAllPosts,
  ISearchedPostResults,
  IUserDetails,
} from "@/interfaces/postsInterface";
import {
  createNewPost,
  editAPost,
  fetchAllUsers,
  getAllPosts,
  getSearchedPosts,
} from "@/services/services";
import {
  EditTwoTone,
  LoginOutlined,
  LogoutOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Input, Typography, message } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import styles from "./headerContents.module.css";

const newPostInitialValues = {
  title: "",
  description: "",
  descriptionHtmlText: "",
  category: "",
  image: "",
};

const HeaderContents = () => {
  const { Title, Text } = Typography;
  const { TextArea } = Input;

  const router = useRouter();
  const { id } = useParams();

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchedPostResults, setSearchedPostResults] = useState<
    ISearchedPostResults[]
  >([]);
  const [newPost, setNewPost] = useState<INewPostPayload>(newPostInitialValues);
  const [value, setValue] = useState<string>(" ");

  const {
    userDetails,
    setUserDetails,
    setAllUsers,
    setAllPosts,
    setSinglePostDetails,
    setIsModalOpen,
    isModalOpen,
    singlePostDetails,
    allPosts,
    isEditMode,
    setIsEditMode,
    setPageNumber,
  } = useContext(BlogCtx);

  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const handleUserRegister = () => {
    router.push("/signup");
  };

  const handleRedirectToUserLogin = () => {
    sessionStorage.removeItem("token");
    router.push("/signin");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setNewPost({ ...newPostInitialValues });
    setValue("");
    setSinglePostDetails("");
    if (isEditMode) {
      setIsEditMode(false);
    }
  };

  const handlePublishNewPost = async () => {
    const payload = {
      title: newPost.title,
      description: newPost.description,
      descriptionHtmlText: value,
    };

    try {
      if (payload.title.length > 0 && payload.description.length > 0) {
        const data = await createNewPost(payload);
        if (data.status === 200) {
          try {
            const fetchedPosts = await getAllPosts(0);
            setAllPosts([...fetchedPosts.data]);
            setIsModalOpen(false);
            message.success("Post Created");
          } catch (error) {
            console.log(error);
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setNewPost({ ...newPostInitialValues });
      setValue("");
    }
  };

  const handleEditPost = async () => {
    const payload = {
      title: newPost.title,
      description: newPost.description,
      descriptionHtmlText: value,
    };

    const data = await editAPost(singlePostDetails._id, payload);
    if (data.status === 200) {
      const fetchedPosts = await getAllPosts(0);
      setAllPosts([...fetchedPosts.data]);
      setPageNumber(0);
      setIsModalOpen(false);
      message.success("Post Updated");
    }
  };

  const footerButtons = () => {
    return isEditMode ? (
      <Button key="submit" type="primary" onClick={handleEditPost}>
        Update
      </Button>
    ) : (
      <Button key="submit" type="primary" onClick={handlePublishNewPost}>
        Publish
      </Button>
    );
  };

  const handlePostTitleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewPost({
      ...newPost,
      title: event.target.value,
    });
  };

  const popOverContent = () => {
    const token = sessionStorage.getItem("token");

    if (token) {
      return (
        <div onClick={handleRedirectToUserLogin}>
          <LogoutOutlined /> Logout
        </div>
      );
    } else {
      return (
        <div className={styles.authUserContents}>
          <div onClick={handleUserRegister}>
            <UpOutlined /> Register
          </div>
          <div onClick={handleRedirectToUserLogin}>
            <LoginOutlined /> Login
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    if (searchValue.length > 0) {
      const debounce = setTimeout(async () => {
        const payload = {
          searchedText: searchValue,
        };
        const searchedResults = await getSearchedPosts(payload);
        setSearchedPostResults(searchedResults);
      }, 500);
      return () => clearTimeout(debounce);
    }
  }, [searchValue]);

  useEffect(() => {
    (async () => {
      const allUsers = await fetchAllUsers();
      console.log("alluser", allUsers);

      const userDetails = allUsers.find(
        (userObj: IUserDetails) => userObj._id === id
      );
      setUserDetails(userDetails);
    })();
  }, []);

  useEffect(() => {
    if (Object.keys(singlePostDetails).length > 0) {
      const postDetails = allPosts.find(
        (post: IAllPosts) => post._id === singlePostDetails._id
      );
      setNewPost({
        ...newPost,
        title: postDetails?.title,
      });
      setValue(postDetails.descriptionHtmlText);
    }
  }, [singlePostDetails]);

  return (
    <>
      <div className={styles.mainHeader}>
        <div className={styles.subHeaderContents}>
          <div className={styles.searchContainer}>
            <div className={styles.logo}>PUBLISH</div>
            <div>
              <Input
                placeholder="Search...."
                allowClear
                size="large"
                style={{ width: 500 }}
                onChange={handleOnSearch}
                value={searchValue}
              />
            </div>
          </div>

          <div className={styles.createPostContainer}>
            <div>
              <Button type="default" size={"large"} onClick={handleOpenModal}>
                <EditTwoTone style={{ fontSize: "17px" }} />
                Create Post
              </Button>
            </div>

            <div>
              <Avatar className={styles.avatar}>
                <PopOverControl content={popOverContent()}>
                  {userDetails?.profilePhoto ? (
                    <img src={userDetails?.profilePhoto} />
                  ) : (
                    userDetails?.firstName[0]
                  )}
                </PopOverControl>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.searchResultsCard}>
        {searchValue.length > 0 && searchedPostResults.length > 0 && (
          <Card
            bordered={true}
            style={{ minHeight: 350, width: 500, overflowY: "auto" }}
          >
            {searchedPostResults.map((item) => (
              <>
                <Text type="secondary">@{item.fullName}</Text>
                <Title level={3} className={styles.postTitle}>
                  {item.title}
                </Title>
                <Text type="secondary"></Text>
              </>
            ))}
          </Card>
        )}
      </div>

      <ModalWindow
        title={"Create Post"}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        footerButtons={footerButtons}
        width={1000}
      >
        <Card bordered={true}>
          <div className={styles.postTitleContainer}>
            <TextArea
              className={styles.postTitle}
              onChange={handlePostTitleChange}
              placeholder="New Post Title...."
              autoSize
              value={newPost.title}
              autoFocus
            />
          </div>

          <div className={styles.coverImage}>
            <Button size="large">Add Cover Image</Button>
            <div></div>
          </div>

          <RichTextEditor
            setNewPost={setNewPost}
            newPost={newPost}
            setValue={setValue}
            value={value}
          />
        </Card>
      </ModalWindow>
    </>
  );
};

export default HeaderContents;
