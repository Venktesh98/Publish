"use client";
import PopOverControl from "@/components/shared/PopOverControl";
import {
  ISearchedPostResults,
  IUserDetails,
} from "@/interfaces/postsInterface";
import { fetchAllUsers, getSearchedPosts } from "@/services/services";
import {
  EditTwoTone,
  LoginOutlined,
  LogoutOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Input, Typography } from "antd";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./headerContents.module.css";

const HeaderContents = () => {
  const { Title, Text } = Typography;

  const router = useRouter();
  const { id } = useParams();

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchedPostResults, setSearchedPostResults] = useState<
    ISearchedPostResults[]
  >([]);
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);

  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const handleUserRegister = () => {
    router.push("/signup");
  };

  const handleRedirectToUserLogin = () => {
    sessionStorage.removeItem("token");
    router.push("/signin");
  };

  const popOverContent = () => {
    const token = sessionStorage.getItem("token");

    if (token) {
      return (
        <div onClick={handleRedirectToUserLogin}>
          <LogoutOutlined /> Logout
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
    (async () => {
      const allUsers = await fetchAllUsers();
      console.log("alluser", allUsers);

      const userDetails = allUsers.find(
        (userObj: IUserDetails) => userObj._id === id
      );
      setUserDetails(userDetails);
    })();
  }, []);

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

          <div className={styles.createPostContainer}>
            <div>
              <Button type="default" size={"large"}>
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
