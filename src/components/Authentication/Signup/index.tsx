"use client";
import { registerUser } from "@/services/services";
import {
  LockOutlined,
  MailOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { FormInstance } from "antd";
import { Button, Card, Flex, Form, Input, Upload, message } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import Link from "next/link";
import { useRef, useState } from "react";
import styles from "./signup.module.css";
import { ISubmitSignupFormValues } from "@/interfaces/formInterface";
import JoinCommunityText from "@/components/shared/JoinCommunity";

type FieldType = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
};

const initialValues = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
};

const PublishSignup = () => {
  const [fileList, setFileList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formRef = useRef<FormInstance>(null);

  const handleFormSubmit = async (values: ISubmitSignupFormValues) => {
    const formData = new FormData();
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("userName", values.userName);
    formData.append("email", values.email);
    formData.append("password", values.password);

    if (fileList[0] !== undefined) {
      formData.append("profile-photo", fileList[0]?.originFileObj);
    }

    setIsLoading(true);

    try {
      await registerUser(formData as unknown as ISubmitSignupFormValues);
      message.success("Registered Successfully");
      setIsLoading(false);
      formRef?.current?.resetFields();
    } catch (error: any) {
      message.error(error.response.data.message ?? "Something went wrong");
      setIsLoading(false);
    }
  };

  const handleImageUpload = (info: UploadChangeParam) => {
    console.log("info:", info);

    if (info.file.status === "done") {
      //   setFileList(info.fileList);
      //   setFileList(info.file);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <section>
      <JoinCommunityText />

      <Form
        name="basic"
        initialValues={initialValues}
        onFinish={handleFormSubmit}
        ref={formRef}
      >
        <Card title="Create a account" className={styles.signupCard}>
          <Flex vertical gap={15} className={styles.registrationContainer}>
            <Form.Item<FieldType>
              name="firstName"
              rules={[
                { required: true, message: "Please enter your First Name" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="First Name" />
            </Form.Item>

            <Form.Item<FieldType>
              name="lastName"
              rules={[
                { required: true, message: "Please enter your Last Name" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Last Name" />
            </Form.Item>

            <Form.Item<FieldType>
              name="userName"
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="User Name" />
            </Form.Item>

            <Form.Item<FieldType>
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                type="email"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[
                { required: true, message: "Please input your password" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Upload
                name="file"
                listType="picture"
                onChange={handleImageUpload}
                // fileList={fileList}
                // beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item className={styles.submitBtn}>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                style={{ width: "100%" }}
              >
                Signup
              </Button>
            </Form.Item>
          </Flex>
          <hr className={styles.divider} />
          <p className={styles.login}>
            Already a user? <Link href="/signin">Login</Link>
          </p>
        </Card>
      </Form>
      <div className={styles.agree}>
        By signing up, you are agreeing to our <span>privacy policy</span>,
        terms of use and <span>code of conduct</span>.
      </div>
    </section>
  );
};

export default PublishSignup;
