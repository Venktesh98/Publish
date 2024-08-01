"use client";
import RichTextEditor from "@/components/Posts/Editor";
import ModalWindow from "@/components/shared/Modal";
import PopOverControl from "@/components/shared/PopOverControl";
import { BlogCtx } from "@/context/blogContext";
import { useImageUpload } from "@/hooks/useImageUpload";
import { INewPostPayload } from "@/interfaces/createPostInterface";
import { IAllPosts, ISearchedPostResults } from "@/interfaces/postsInterface";
import {
  createNewPost,
  editAPost,
  getAllPosts,
  getSearchedPosts,
} from "@/services/services";
import {
  EditTwoTone,
  FrownOutlined,
  LoginOutlined,
  LogoutOutlined,
  UpOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Form,
  FormInstance,
  Input,
  Progress,
  Upload,
  message,
} from "antd";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./headerContents.module.css";
import Link from "next/link";

type FieldType = {
  title: string;
  description: string;
  userName: string;
  category: string;
  photo: string;
};

const useFormData = () => {
  const newPostInitialValues = {
    title: "",
    description: "",
    descriptionHtmlText: "",
    category: "",
    photo: "",
  };

  const [newPost, setNewPost] = useState<INewPostPayload>(newPostInitialValues);
  const [value, setValue] = useState<string>(" ");
  const { fileList, handleImageUpload } = useImageUpload(
    "cover-image",
    "posts"
  );

  const formData = new FormData();

  formData.append("title", newPost.title);
  formData.append("description", newPost.description);
  formData.append("descriptionHtmlText", value);
  if (fileList[0] !== undefined) {
    formData.append("cover-image", fileList[0]?.originFileObj);
  }

  return {
    newPost,
    setNewPost,
    value,
    setValue,
    fileList,
    handleImageUpload,
    formData,
    newPostInitialValues,
  };
};

const HeaderContents = () => {
  const { TextArea } = Input;

  const router = useRouter();

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchedPostResults, setSearchedPostResults] = useState<
    ISearchedPostResults[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formRef = useRef<FormInstance>(null);
  const {
    fileList,
    handleImageUpload,
    newPost,
    setNewPost,
    setValue,
    value,
    newPostInitialValues,
    formData,
  } = useFormData();

  const {
    userDetails,
    setAllPosts,
    setSinglePostDetails,
    setIsModalOpen,
    isModalOpen,
    singlePostDetails,
    allPosts,
    isEditMode,
    setIsEditMode,
    setPageNumber,
    uploadProgress,
    setUploadProgress,
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

  const redirectToHomePage = () => {
    router.push(`/${userDetails.id}`);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setNewPost({ ...newPostInitialValues });
    setValue("");
    setSinglePostDetails("");
    setUploadProgress(0);
    if (isEditMode) {
      setIsEditMode(false);
    }
  };

  const handlePublishNewPost = async () => {
    setIsLoading(true);

    try {
      if (newPost.title.length > 0 && newPost.description.length > 0) {
        const data = await createNewPost(
          formData as unknown as INewPostPayload
        );
        if (data.status === 200) {
          try {
            const fetchedPosts = await getAllPosts(0);
            setAllPosts([...fetchedPosts.data]);
            setIsModalOpen(false);
            setIsLoading(false);
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
      formRef.current?.resetFields();
    }
  };

  const handleEditPost = async () => {
    setIsLoading(true);
    const data = await editAPost(
      singlePostDetails._id,
      formData as unknown as INewPostPayload
    );
    if (data.status === 200) {
      const fetchedPosts = await getAllPosts(0);
      setAllPosts([...fetchedPosts.data]);
      setPageNumber(0);
      setIsModalOpen(false);
      setIsLoading(false);
      message.success("Post Updated");
    }
  };

  const footerButtons = () => {
    return isEditMode ? (
      <Form.Item className={styles.formItem}>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.formSubmit}
          loading={isLoading}
        >
          {isLoading ? "Updating" : "Update"}
        </Button>
      </Form.Item>
    ) : (
      <Form.Item className={styles.formItem}>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.formSubmit}
          loading={isLoading}
        >
          {isLoading ? "Publishing" : "Publish"}
        </Button>
      </Form.Item>
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
        <div className={styles.userDetailsContainer}>
          <div>
            <UserOutlined />
            <span className={styles.userName}>
              <Link href={`/user/details/${userDetails?._id}`}>
                @{userDetails?.fullName}
              </Link>
            </span>
          </div>
          <div onClick={handleRedirectToUserLogin} className={styles.logout}>
            <LogoutOutlined /> Logout
          </div>
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
            <div className={styles.logo} onClick={redirectToHomePage}>
              PUBLISH
            </div>
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
        {searchValue.length > 0 && searchedPostResults.length > 0 ? (
          <Card
            bordered={true}
            style={{
              minHeight: 350,
              width: 500,
              overflowY: "auto",
            }}
          >
            {searchedPostResults.map((item) => (
              <>
                <div className={styles.fullName}>@{item?.fullName}</div>
                <div
                  className={styles.searchedPostTitle}
                  onClick={() => router.push(`/post/${item.id}`)}
                >
                  {item.title}
                </div>
              </>
            ))}
          </Card>
        ) : null}

        {searchValue.length > 0 && !searchedPostResults.length && (
          <Card bordered={true} style={{ width: 500 }}>
            <div className={styles.noPostsAvailable}>
              <div>
                <FrownOutlined style={{ fontSize: "32px" }} />
              </div>

              <div>No Posts Available</div>
            </div>
          </Card>
        )}
      </div>

      <ModalWindow
        title={isEditMode ? "Edit Post" : "Create Post"}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        footerButtons={undefined}
        width={1000}
      >
        <Form
          name="create-post"
          onFinish={isEditMode ? handleEditPost : handlePublishNewPost}
          ref={formRef}
          initialValues={newPostInitialValues}
        >
          <Card bordered={true}>
            <Form.Item<FieldType> className={styles.formItem} name="title">
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
            </Form.Item>

            <Form.Item<FieldType> className={styles.formItem} name="photo">
              <div className={styles.coverImage}>
                <div>
                  <Upload
                    listType="picture"
                    onChange={handleImageUpload}
                    fileList={fileList}
                    accept={".png,.jpeg,.jpg,.webp"}
                    beforeUpload={() => false}
                    maxCount={1}
                  >
                    <Button size="large">Add Cover Image</Button>
                  </Upload>
                </div>

                <div>
                  {uploadProgress > 0 && (
                    <Progress
                      type="dashboard"
                      size={70}
                      percent={uploadProgress}
                      gapDegree={uploadProgress}
                      trailColor="rgba(0, 0, 0, 0.06)"
                      strokeWidth={20}
                      steps={8}
                    />
                  )}
                </div>
              </div>
            </Form.Item>

            <Form.Item<FieldType> className={styles.formItem}>
              <div className={styles.createPostEditor}>
                <RichTextEditor
                  setNewPost={setNewPost as any}
                  newPost={newPost}
                  setValue={setValue}
                  value={value}
                />
              </div>
            </Form.Item>
          </Card>

          {footerButtons()}
        </Form>
      </ModalWindow>
    </>
  );
};

export default HeaderContents;
