"use client";
import { useEffect } from "react";

const MainPage = () => {
  useEffect(() => {
    window.location.href = "/signin";
  }, []);
};

export default MainPage;
