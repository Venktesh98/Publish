"use client";
import { ISearchedPostResults } from "@/interfaces/postsInterface";
import { getSearchedPosts } from "@/services/services";
import { Button, Card, Input, Typography } from "antd";
import { useEffect, useState } from "react";
import styles from "./headerContents.module.css";
import { EditTwoTone } from "@ant-design/icons";

const HeaderContents = () => {
  const { Title, Text } = Typography;

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchedPostResults, setSearchedPostResults] = useState<
    ISearchedPostResults[]
  >([]);

  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
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

  return (
    <>
      <div className={styles.mainHeader}>
        <div className={styles.subHeaderContents}>
          <div className={styles.searchContainer}>
            <div>LOGO</div>
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

          <div>
            <Button type="default" size={"large"}>
              <EditTwoTone style={{ fontSize: "17px" }} />
              Create Post
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.searchResultsCard}>
        {searchValue.length > 0 && searchedPostResults.length > 0 && (
          <Card
            bordered={true}
            style={{ minHeight: 350, width: 500, overflowY: "auto" }}
          >
            {searchedPostResults.map((item) => (
              <>
                <Text type="secondary">@{item.fullName}</Text>
                <Title level={3} className={styles.postTitle}>
                  {item.title}
                </Title>
                <Text type="secondary"></Text>
              </>
            ))}
          </Card>
        )}
      </div>
    </>
  );
};

export default HeaderContents;
