"use client";
import JoinCommunityText from "@/components/shared/JoinCommunityText";
import { ILoginFormValues } from "@/interfaces/formInterface";
import { loginUser } from "@/services/services";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Flex, Form, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./signin.module.css";

const PublishSignIn = () => {
  const router = useRouter();

  const handleFormLogin = async (values: ILoginFormValues) => {
    try {
      const data = await loginUser(values);
      message.success("LoggedIn Successfully");
      sessionStorage.setItem("token", data.token);
      router.push(`/${data.userId}`);
    } catch (error: any) {
      message.error(error?.response?.data?.message ?? error.msg);
    }
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
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <div className={styles.rememberContainer}>
                  <Checkbox>Remember me</Checkbox>
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
