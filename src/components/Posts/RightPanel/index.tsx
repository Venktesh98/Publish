import { Card, Typography } from "antd";
import Link from "next/link";
import styles from "./rightPanel.module.css";

const gridStyle = {
  width: "100%",
  cursor: "pointer",
};

const RightPanel = () => {
  const { Text } = Typography;
  return (
    <div className={styles.rightPanelContainer}>
      <Card title="Popular Communities">
        <Card.Grid style={gridStyle}>
          <Link href="https://react.dev/community" target="_blank">
            <div>
              <Text strong>React</Text>
            </div>
            <div>
              <Text type="secondary">
                A JavaScript library for building user interfaces (UIs) on the
                web. React is a declarative, component based library that allows
                developers to build reusable UI components and It follows the
                Virtual DOM (Document Object Model) approach, which optimizes
                rendering performance by minimizing DOM updates. React is fast
                and works well with other tools and libraries.
              </Text>
            </div>
          </Link>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <Link href="https://vuejs.org/about/community-guide" target="_blank">
            <div>
              <Text strong>Vue</Text>
            </div>

            <div>
              <Text type="secondary">
                Vue.js is an open-source model–view–viewmodel front end
                JavaScript framework for building user interfaces and
                single-page applications.
              </Text>
            </div>
          </Link>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <Link href="https://nodejs.org/en/about/get-involved" target="_blank">
            <div>
              <Text strong>Node</Text>
            </div>

            <div>
              <Text type="secondary">
                Node.js is an open-source, cross-platform JavaScript runtime
                environment that executes JavaScript code outside of a browser.
                Node.js is built on Chrome's V8 JavaScript engine.
              </Text>
            </div>
          </Link>
        </Card.Grid>
      </Card>

      <Card title="Active Discussions">
        <Card.Grid style={gridStyle} hoverable={true}>
          <Text>
            Rendering the images in the good way in your React application.
          </Text>
        </Card.Grid>

        <Card.Grid style={gridStyle} hoverable={true}>
          <Text>
            Write Less, Fix never the art of writing highly reliable code.
          </Text>
        </Card.Grid>

        <Card.Grid style={gridStyle} hoverable={true}>
          <Text>Responding to an Events in vanilla Javascript vs React</Text>
        </Card.Grid>

        <Card.Grid style={gridStyle} hoverable={true}>
          <Text>Exciting News, my brand new website is live.</Text>
        </Card.Grid>

        <Card.Grid style={gridStyle} hoverable={true}>
          <Text>
            Making use of React Hooks in a proper way for better code and
            flexibility.
          </Text>
        </Card.Grid>
      </Card>
    </div>
  );
};

export default RightPanel;
