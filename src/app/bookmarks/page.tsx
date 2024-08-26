import dynamic from "next/dynamic";
const BookmarksList = dynamic(() => import("@/components/Posts/Bookmarks"), {
  ssr: false,
});

const BookmarkPage = () => {
  return <BookmarksList />;
};

export default BookmarkPage;
