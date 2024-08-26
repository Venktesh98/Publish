"use client";

import HeaderLayout from "@/components/shared/HeaderLayout";
import PopOverControl from "@/components/shared/PopOverControl";
import { IAllPosts } from "@/interfaces/postsInterface";
import { getAllPosts, loggedInUserProfile } from "@/services/services";
import { serializeDate } from "@/utils/helpers";
import { Avatar, Card, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./bookmarks.module.css";

const BookmarksList = () => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState<IAllPosts[]>([]);
  const { Title } = Typography;

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await loggedInUserProfile();
      const allPostsData = await getAllPosts(0);

      if (data.status === 200) {
        setBookmarkedPosts(data?.data?.bookmarkedPosts);
      }

      const posts = allPostsData?.data?.filter((posts: IAllPosts) =>
        data?.data?.bookmarkedPosts.includes(posts.id)
      );
      setBookmarkedPosts(posts);
    })();
  }, []);

  const handleRedirectToDetailPage = (postId: string) => {
    router.push(`/post/${postId}`);
  };

  const popOverContent = (postDetails: IAllPosts) => {
    return (
      <div>
        <div className={styles.userName}>{postDetails.user.fullName}</div>

        <div>{serializeDate(postDetails.createdAt).formattedDate}</div>
      </div>
    );
  };

  return (
    <section>
      <HeaderLayout />
      <div className={styles.bookmarksMainContainer}>
        <Title level={2}>Bookmarks</Title>

        {bookmarkedPosts.map((bookmarkPostObj: IAllPosts) => (
          <div className={styles.bookmarkedPostDetails}>
            <div className={styles.imageContainer}>
              <Avatar className={styles.avatar}>
                <PopOverControl
                  content={popOverContent(bookmarkPostObj)}
                  placement="right"
                >
                  {bookmarkPostObj?.user?.profilePhoto ? (
                    <img src={bookmarkPostObj?.user?.profilePhoto} />
                  ) : (
                    bookmarkPostObj.user?.firstName[0]
                  )}
                </PopOverControl>
              </Avatar>
            </div>

            <div>
              <Card
                title={bookmarkPostObj.title}
                className={styles.card}
                onClick={() => handleRedirectToDetailPage(bookmarkPostObj._id)}
              >
                <div className={styles.bookmarkedPostDescription}>
                  {bookmarkPostObj.description}
                </div>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookmarksList;
