import { Typography } from "antd";
import styles from "./joinCommunity.module.css";

const JoinCommunityText = () => {
  const { Title } = Typography;

  return (
    <div className={styles.signupContainer}>
      <Title level={2} className={styles.mainText}>
        Join the PUBLISH Community
      </Title>
      <div className={styles.subText}>
        PUBLISH community is family of 1,65,500+ members
      </div>
    </div>
  );
};

export default JoinCommunityText;
