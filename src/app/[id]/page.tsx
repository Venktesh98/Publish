"use client";
import Layout from "@/components/shared/Layout/layout";
import { useParams } from "next/navigation";

const Home = () => {
  const { id } = useParams();

  if (typeof window !== "undefined") {
    sessionStorage.setItem("userId", id as string);
  }
  return <Layout />;
};

export default Home;
