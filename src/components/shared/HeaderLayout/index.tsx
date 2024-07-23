import HeaderContents from "@/components/Header/Contents";
import MainHeader from "@/components/Header/mainHeader";
import { BlogCtx } from "@/context/blogContext";
import { IUserDetails } from "@/interfaces/postsInterface";
import { fetchAllUsers } from "@/services/services";
import { useContext, useEffect } from "react";

const HeaderLayout = () => {
  const { setUserDetails, setAllUsers } = useContext(BlogCtx);

  useEffect(() => {
    (async () => {
      const allUsersDetails = await fetchAllUsers();
      setAllUsers(allUsersDetails);

      const loggedInUserDetails = allUsersDetails.find(
        (userObj: IUserDetails) =>
          userObj._id === sessionStorage.getItem("userId")
      );
      setUserDetails(loggedInUserDetails);
    })();
  }, []);

  return (
    <MainHeader>
      <HeaderContents />
    </MainHeader>
  );
};

export default HeaderLayout;
