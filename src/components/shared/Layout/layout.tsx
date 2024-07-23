"use client";
import BlogRootComp from "@/components/Header";
import HeaderLayout from "../HeaderLayout";
import styles from "./layout.module.css";

export default function Layout() {
  return (
    <div>
      <HeaderLayout />
      <main className={styles.main}>
        <BlogRootComp />
      </main>
    </div>
  );
}
