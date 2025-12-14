import type { ReactNode } from "react";
import styles from "./PageLayout.module.css";

type PageLayoutProps = {
  children: ReactNode;
};

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className={styles.page}>
      <main className={styles.container}>{children}</main>
    </div>
  );
};

export default PageLayout;
