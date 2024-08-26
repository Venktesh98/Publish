"use client";
import { checkUserAuthentication } from "@/services/services";
import { useEffect } from "react";

const MainPage = () => {
  useEffect(() => {
    (async () => {
      const data = await checkUserAuthentication();
      const { isAuthenticated, userId, token } = data?.data;

      if (isAuthenticated) {
        await sessionStorage.setItem("token", token);
        window.location.href = userId;
      } else {
        window.location.href = "/signin";
      }
    })();
  }, []);
};

export default MainPage;
