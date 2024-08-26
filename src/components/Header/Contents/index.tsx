"use client";
import RichTextEditor from "@/components/Posts/Editor";
import ModalWindow from "@/components/shared/Modal";
import PopOverControl from "@/components/shared/PopOverControl";
import { BlogCtx } from "@/context/blogContext";
import { useImageUpload } from "@/hooks/useImageUpload";
import { INewPostPayload } from "@/interfaces/createPostInterface";
import { ICategoryDetails } from "@/interfaces/formInterface";
import { IAllPosts, ISearchedPostResults } from "@/interfaces/postsInterface";
import {
  createNewCategory,
  createNewPost,
  editAPost,
  getAllPosts,
  getSearchedPosts,
  logoutUser,
} from "@/services/services";
import {
  EditTwoTone,
  FrownOutlined,
  LoginOutlined,
  LogoutOutlined,
  PlusOutlined,
  UpOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  InputRef,
  Progress,
  Tag,
  Upload,
  message,
  theme,
} from "antd";
import { useForm } from "antd/es/form/Form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./headerContents.module.css";

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
    category: [
      {
        _id: "",
        title: "",
        user: "",
        isDefault: false,
        createdAt: "",
        updatedAt: "",
      },
    ],
    photo: "",
  };

  const [newPost, setNewPost] = useState<INewPostPayload>(newPostInitialValues);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [value, setValue] = useState<string>(" ");
  const { fileList, handleImageUpload, setFileList } = useImageUpload(
    "cover-image",
    "posts"
  );

  const formData = new FormData();

  formData.append("title", newPost.title);
  formData.append("description", newPost.description);
  formData.append("descriptionHtmlText", value);
  formData.append("category", selectedTags.join(","));
  if (fileList[0] !== undefined) {
    formData.append("cover-image", fileList[0]?.originFileObj);
  }

  return {
    newPost,
    setNewPost,
    value,
    setValue,
    fileList,
    setFileList,
    handleImageUpload,
    formData,
    newPostInitialValues,
    selectedTags,
    setSelectedTags,
  };
};

const tagInputStyle: React.CSSProperties = {
  width: 64,
  height: 22,
  marginInlineEnd: 8,
  verticalAlign: "top",
};

const HeaderContents = () => {
  const { TextArea } = Input;

  const router = useRouter();

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchedPostResults, setSearchedPostResults] = useState<
    ISearchedPostResults[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<ICategoryDetails[]>([]);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<InputRef>(null);
  const [form] = useForm();
  const { token } = theme.useToken();

  const {
    fileList,
    setFileList,
    handleImageUpload,
    newPost,
    setNewPost,
    setValue,
    value,
    newPostInitialValues,
    formData,
    selectedTags,
    setSelectedTags,
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
    uploadProgress,
    setUploadProgress,
    categories,
  } = useContext(BlogCtx);

  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const handleUserRegister = () => {
    router.push("/signup");
  };

  const handleRedirectToUserLogin = async () => {
    const data = await logoutUser();
    if (data.status === 200) {
      sessionStorage.removeItem("token");
      message.success("Logged out")
      router.push("/signin");
    }
  };

  const redirectToHomePage = () => {
    router.push(`/${userDetails.id}`);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleCategoryChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = async () => {
    if (inputValue.length > 0) {
      const payload = {
        title: inputValue,
      };

      try {
        const categoriesData = await createNewCategory(payload);
        if (categoriesData.status === 200) {
          setTags([...tags, categoriesData?.data]);
          setInputVisible(false);
          setInputValue("");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFileList([]);
    setNewPost({ ...newPostInitialValues });
    setValue("");
    setSinglePostDetails("");
    setUploadProgress(0);
    setSelectedTags([]);
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
            handleCancel();
            setIsLoading(false);
            message.success("Post Created");
          } catch (error) {
            console.log(error);
          }
        }
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    } finally {
      setNewPost({ ...newPostInitialValues });
      setValue("");
      form.resetFields();
      setIsLoading(false);
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
      handleCancel();
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
          disabled={!newPost.title.length && !newPost.description.length}
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
    if (isEditMode && Object.keys(singlePostDetails).length > 0) {
      const postDetails = allPosts.find(
        (post: IAllPosts) => post._id === singlePostDetails._id
      );
      setNewPost({
        ...newPost,
        title: postDetails?.title,
      });
      setSelectedTags([
        ...postDetails.category.map(
          (categoryId: ICategoryDetails) => categoryId._id
        ),
      ]);
      setValue(postDetails.descriptionHtmlText);
    }
  }, [singlePostDetails, isEditMode]);

  useEffect(() => {
    const allCategories = categories.filter(
      (tags: ICategoryDetails) => tags.isDefault === true
    );

    if (isEditMode) {
      const postDetails = allPosts.find(
        (post: IAllPosts) => post._id === singlePostDetails._id
      );

      const combineCategories = [...allCategories, ...postDetails.category];
      const filteredTags = combineCategories.reduce((acc, current) => {
        const isDuplicate = acc.find(
          (tag: ICategoryDetails) => tag._id === current._id
        );
        if (!isDuplicate) {
          acc.push(current);
        }
        return acc;
      }, []);

      setTags(filteredTags);
    } else {
      setTags(allCategories);
    }
  }, [categories, isModalOpen, isEditMode, allPosts]);

  const tagPlusStyle: React.CSSProperties = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: "dashed",
    cursor: "pointer",
  };

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
          form={form}
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

            <Form.Item<FieldType> name="category">
              {tags?.map((tag: ICategoryDetails, index) => {
                return (
                  <Tag.CheckableTag
                    key={tag._id}
                    checked={selectedTags?.includes(tag._id)}
                    onChange={(checked) =>
                      handleCategoryChange(tag._id, checked)
                    }
                  >
                    #{tag.title}
                  </Tag.CheckableTag>
                );
              })}

              {inputVisible ? (
                <Input
                  ref={inputRef}
                  type="text"
                  size="small"
                  style={tagInputStyle}
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputConfirm}
                  onPressEnter={handleInputConfirm}
                />
              ) : (
                <Tag
                  style={tagPlusStyle}
                  icon={<PlusOutlined />}
                  onClick={showInput}
                >
                  New Category
                </Tag>
              )}
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
