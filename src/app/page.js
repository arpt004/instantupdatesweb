import { Suspense } from "react";
import styles from "./page.module.css";
import Main from "@/components/main/main";
import Loader from "@/components/common/Loader/loader";

// import AvatarUploadPage from "@/components/practice/AvatarUploadPage"; 

export default function Home() {
  return (
    <main className={styles.main}>
      <Suspense fallback={<Loader />}>
        <Main />
      </Suspense>
    </main>
  );
}
