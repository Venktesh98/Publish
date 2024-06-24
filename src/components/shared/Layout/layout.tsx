"use client";
import BlogRootComp from "@/components/Header";
import HeaderContents from "@/components/Header/Contents";
import MainHeader from "@/components/Header/mainHeader";
import styles from "./layout.module.css";

export default function Layout() {
  return (
    <div>
      <MainHeader>
        <HeaderContents />
      </MainHeader>
      <main className={styles.main}>
<<<<<<< Updated upstream
        <HeaderComp />
=======
        <BlogRootComp />
>>>>>>> Stashed changes
      </main>
    </div>
  );
}
