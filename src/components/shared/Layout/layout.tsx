"use client";
import HeaderComp from "@/components/Header";
import HeaderContents from "@/components/Header/Contents";
import MainHeader from "@/components/Header/mainHeader";
import { IAllPosts } from "@/interfaces/postsInterface";
import { getAllPosts } from "@/services/services";
import { useEffect, useState } from "react";
import styles from "./layout.module.css";

export default function Layout() {
  const [allPosts, setAllPosts] = useState<IAllPosts[]>([]);

  useEffect(() => {
    (async () => {
      const fetchedPosts = await getAllPosts();
      setAllPosts(fetchedPosts);
    })();
  }, []);

  return (
    <div>
      <MainHeader>
        <HeaderContents />
      </MainHeader>
      <main className={styles.main}>
        <HeaderComp allPosts={allPosts} />
      </main>
    </div>
  );
}
