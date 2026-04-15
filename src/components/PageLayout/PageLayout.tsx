import type { ReactNode } from "react";
import styles from "./PageLayout.module.css";

type PageLayoutProps = {
  children: ReactNode;
};

/**
 * Компонент PageLayout для відображення основного макета сторінки.
 * @param {any} {children}:PageLayoutProps
 * @returns {any}
 */
const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className={styles.page}>
      <main className={styles.container}>{children}</main>
    </div>
  );
};

export default PageLayout;
