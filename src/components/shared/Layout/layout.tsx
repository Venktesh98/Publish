"use client";
import HeaderComp from "@/components/Header";
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
        <HeaderComp />
      </main>
    </div>
  );
}
