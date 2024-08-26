"use client";
import JoinCommunityText from "@/components/shared/JoinCommunityText";
import { ILoginFormValues } from "@/interfaces/formInterface";
import { loginUser } from "@/services/services";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Flex, Form, Input, message } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./signin.module.css";

const PublishSignIn = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const router = useRouter();

  const handleFormLogin = async (values: ILoginFormValues) => {
    try {
      const data = await loginUser(values);
      message.success("LoggedIn Successfully");
      if (typeof window !== "undefined") {
        sessionStorage.setItem("token", data.token);
      }
      router.push(`/${data.userId}`);
    } catch (error: any) {
      message.error(error?.response?.data?.message ?? error.msg);
    }
  };

  const handleRememberMe = (event: CheckboxChangeEvent) => {
    setRememberMe(event.target.checked);
  };

  return (
    <section>
      <JoinCommunityText />

      <Form name="normal_login" onFinish={handleFormLogin}>
        <Card title="Login" className={styles.signinCard}>
          <Flex vertical gap={15} className={styles.loginContainer}>
            <Form.Item
              name="userName"
              rules={[
                { required: true, message: "Please enter your Username!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="rememberMe" valuePropName="checked" noStyle>
                <div className={styles.rememberContainer}>
                <Checkbox onChange={handleRememberMe} checked={rememberMe}>
                    Remember me
                  </Checkbox>
                  <Link href="#">Forgot password</Link>
                </div>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className={styles.login}>
                Log in
              </Button>
            </Form.Item>

            <hr className={styles.divider} />
            <p className={styles.createAccount}>
              New to Community? <Link href="/signup">Create a account</Link>
            </p>
          </Flex>
        </Card>
      </Form>
    </section>
  );
};

export default PublishSignIn;
