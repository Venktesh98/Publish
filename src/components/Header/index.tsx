"use client";
import { IAllPostsProps } from "@/interfaces/postsInterface";
import { Layout, Typography, theme } from "antd";
import { recommendedTopics } from "../../utils/jsons";
import AllPosts from "../Posts";
const recommendedTopicsList = recommendedTopics;

const HeaderComp = ({ allPosts }: IAllPostsProps) => {
  const { Header, Content, Footer, Sider } = Layout;
  const { Title } = Typography;

  //   const items = [
  //     UserOutlined,
  //     VideoCameraOutlined,
  //     UserOutlined,
  //     UploadOutlined,
  //   ].map((icon, index) => ({
  //     key: String(index + 1),
  //     icon: React.createElement(icon),
  //     label: `nav ${index + 1}`,
  //   }));

  const recommendedTopicsList = recommendedTopics.topics.map((item) => ({
    key: item.id,
    label: item.name,
  }));

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div>
      {/* <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={280}
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        theme="light"
      >
        <Title level={4}>Recommended Topics</Title>
        {recommendedTopicsList.map((tag) => (
          <div className={styles.recommendedTopics}>
            <Tag key={tag.key} style={{ userSelect: "none" }}>
              {tag.label}
            </Tag>
          </div>
        ))}
      </Sider> */}

      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content>
          <div
            style={{
              // padding: 24,
              //   minHeight: 760,
              //   background: "white",
              borderRadius: borderRadiusLG,
            }}
          >
            <AllPosts allPosts={allPosts} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Publish ©{new Date().getFullYear()} Created by Venktesh Soma
        </Footer>
      </Layout>
    </div>
  );
};

export default HeaderComp;
