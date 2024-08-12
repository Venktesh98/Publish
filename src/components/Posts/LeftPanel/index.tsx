import {
  BulbTwoTone,
  ContactsTwoTone,
  DatabaseTwoTone,
  EditTwoTone,
  HomeTwoTone,
  ProfileTwoTone,
  SaveTwoTone,
  TagTwoTone,
} from "@ant-design/icons";
import { Typography } from "antd";
import Link from "next/link";
import styles from "./leftPanel.module.css";
import { useContext } from "react";
import { BlogCtx } from "@/context/blogContext";

const LeftPanel = () => {
  const { setIsModalOpen } = useContext(BlogCtx);

  const { Title, Text } = Typography;
  return (
    <section className={styles.main}>
      <div className={styles.linksContainer}>
        <div className={styles.type}>
          <HomeTwoTone style={{ fontSize: "18px" }} />
          <Link href="#" className={styles.links}>
            Home
          </Link>
        </div>

        <div className={styles.type}>
          <SaveTwoTone style={{ fontSize: "18px" }} />
          <Link href="#" className={styles.links}>
            Bookmarks
          </Link>
        </div>

        <div className={styles.type}>
          <ProfileTwoTone style={{ fontSize: "18px" }} />
          <Link href="#" className={styles.links}>
            Reading List
          </Link>
        </div>

        <div className={styles.type}>
          <TagTwoTone style={{ fontSize: "18px" }} />
          <Link href="#" className={styles.links}>
            Tags
          </Link>
        </div>

        <div className={styles.type}>
          <BulbTwoTone style={{ fontSize: "18px" }} />
          <Link href="#" className={styles.links}>
            Publish Help
          </Link>
        </div>

        <div className={styles.type}>
          <EditTwoTone style={{ fontSize: "18px" }} />

          <Link
            href="#"
            className={styles.links}
            onClick={() => setIsModalOpen(true)}
          >
            Write
          </Link>
        </div>

        <div className={styles.type}>
          <DatabaseTwoTone style={{ fontSize: "18px" }} />
          <Link href="#" className={styles.links}>
            About
          </Link>
        </div>

        <div className={styles.type}>
          <ContactsTwoTone style={{ fontSize: "18px" }} />
          <Link href="#" className={styles.links}>
            Contact
          </Link>
        </div>
      </div>

      <div>
        <Title level={5}>Recommended Topics</Title>
        <div className={styles.recommendedTopics}>JavaScript interview</div>
        <div className={styles.recommendedTopics}>TypeScript</div>
        <div className={styles.recommendedTopics}>React</div>
        <div className={styles.recommendedTopics}>Node js</div>
        <div className={styles.recommendedTopics}>UI/UX</div>
        <div className={styles.recommendedTopics}>React with TypeScript</div>
        <div className={styles.recommendedTopics}>React Native</div>
        <div className={styles.recommendedTopics}>PWA</div>
      </div>

      <div>
        <Title level={5}>Who to follow</Title>
        <div className={styles.followAuthorContainer}>
          <div className={styles.followContainer}>
            <div>
              <Text strong>Akshay Saini</Text>
              <div className={styles.description}>
                Shares about basics of JavaScript, Must watch Namaste Javascript
                series
              </div>
            </div>
            <div className={styles.follow}>Follow</div>
          </div>

          <div className={styles.followContainer}>
            <div>
              <Text strong>Maximilian Schwarzmüller </Text>
              <div className={styles.description}>
                Author of Academind and Udemy instructer React, Vue, Redux good
                hands on frameworks
              </div>
            </div>
            <div className={styles.follow}>Follow</div>
          </div>

          <div className={styles.followContainer}>
            <div>
              <Text strong>Traversy Media</Text>
              <div className={styles.description}>
                Full end knowledge of frameworks like Angular, vue and libraries
                like React, Redux, Next etc
              </div>
            </div>
            <div className={styles.follow}>Follow</div>
          </div>
        </div>
      </div>

      <div className={styles.info}>
        <span>PUBLISH</span> Community A constructive and inclusive social
        network for software developers. With you every step of your journey.
      </div>

      <div className={styles.info}>
        Made with love on <span>React</span> & <span>Node</span> by{" "}
        <Link href="https://github.com/Venktesh98"> Venktesh Soma</Link>
      </div>
    </section>
  );
};

export default LeftPanel;
