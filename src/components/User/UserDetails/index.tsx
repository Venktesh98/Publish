"use client";
import HeaderLayout from "@/components/shared/HeaderLayout";
import ImageControl from "@/components/shared/ImageControl";
import { IUpdateUserFields } from "@/interfaces/formInterface";
import { IUserDetails } from "@/interfaces/postsInterface";
import { loggedInUserProfile, updateUserDetails } from "@/services/services";
import { serializeDate } from "@/utils/helpers";
import {
  CloseOutlined,
  FieldTimeOutlined,
  MailOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  FormInstance,
  Input,
  Progress,
  Upload,
  message,
} from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./userDetails.module.css";
import { useImageUpload } from "@/hooks/useImageUpload";
import { BlogCtx } from "@/context/blogContext";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
};

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
  const [isUpdateProfile, setIsUpdateProfile] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const { uploadProgress, setUploadProgress } = useContext(BlogCtx);

  const { fileList, handleImageUpload, setFileList } = useImageUpload(
    "profile-pic",
    "users"
  );

  const [form] = Form.useForm();

  const handleProfileUpdate = () => {
    setIsUpdateProfile(true);
    form.setFieldsValue({
      firstName: userDetails?.firstName,
      lastName: userDetails?.lastName,
      email: userDetails?.email,
    });
  };

  const handleSubmitProfileForm = async (values: IUpdateUserFields) => {
    const formData = new FormData();

    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);

    if (fileList[0] !== undefined) {
      formData.append("profile-photo", fileList[0]?.originFileObj);
    }
    setIsUpdating(true);
    try {
      const data = await updateUserDetails(
        formData as unknown as IUpdateUserFields
      );

      if (data.status === 200) {
        setUserDetails(data.data);
        message.success("User Details Updated Successfully");
        form.resetFields();
        setIsUpdating(false);
      }
    } catch (error) {
      console.error(error);
      setIsUpdating(false);
      form.setFields([
        {
          name: "email",
          errors: [`${(error as any)?.response?.data?.message}`],
        },
      ]);
    }
  };

  const handleCloseUserDetailsForm = () => {
    setIsUpdateProfile(false);
    setUploadProgress(0);
    setFileList([]);
  };

  useEffect(() => {
    (async () => {
      const data = await loggedInUserProfile();

      if (data.status === 200) {
        setUserDetails(data?.data);
      }
    })();
  }, []);

  return (
    <section>
      <HeaderLayout />

      <div className={styles.bgBanner}></div>

      <div className={styles.userDetailsContainer}>
        <div>
          <Card>
            <Button
              type="primary"
              size="large"
              className={styles.editProfile}
              onClick={handleProfileUpdate}
            >
              Edit Profile
            </Button>

            <div className={styles.userImage}>
              <ImageControl
                src={userDetails?.profilePhoto as string}
                alt="No Profile Photo"
                height={180}
                width={180}
                isCircle={true}
                photo={userDetails?.profilePhoto}
              />
            </div>

            <div className={styles.userFullName}>{userDetails?.fullName}</div>

            <div className={styles.joinedDate}>
              <div>
                <FieldTimeOutlined style={{ fontSize: "30px" }} />
              </div>
              <div>
                {`Joined on ${
                  serializeDate(userDetails?.createdAt as string)
                    .formattedDateWithYear
                }`}
              </div>
            </div>
          </Card>
        </div>

        <div className={styles.profileContainer}>
          {isUpdateProfile && (
            <Card>
              <div className={styles.updateProfileWithClose}>
                <h2>Update Profile </h2>
                <div className={styles.close}>
                  <CloseOutlined onClick={handleCloseUserDetailsForm} />
                </div>
              </div>

              <div className={styles.userProfileForm}>
                <div className={styles.formFields}>
                  <Form
                    name="update-profile"
                    onFinish={handleSubmitProfileForm}
                    initialValues={initialValues}
                    form={form}
                  >
                    <Form.Item name="firstName">
                      <Input
                        prefix={<UserOutlined />}
                        placeholder="Firstname"
                      />
                    </Form.Item>

                    <Form.Item name="lastName">
                      <Input prefix={<UserOutlined />} placeholder="Lastname" />
                    </Form.Item>

                    <Form.Item name="email">
                      <Input
                        prefix={<MailOutlined />}
                        placeholder="Email"
                        type="email"
                      />
                    </Form.Item>

                    <Form.Item>
                      <h3>Profile Image</h3>

                      <div className={styles.uploadProfileImageContainer}>
                        <div className={styles.profileImageContainer}>
                          <Upload
                            listType="picture"
                            onChange={handleImageUpload}
                            fileList={fileList}
                            accept={".png,.jpeg,.jpg,.webp"}
                            beforeUpload={() => false}
                            maxCount={1}
                          >
                            <Button icon={<UploadOutlined />}>Upload</Button>
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

                    <Form.Item className={styles.updateForm}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={isUpdating}
                      >
                        {`${isUpdating ? "Updating" : "Update"}`}
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserDetails;
