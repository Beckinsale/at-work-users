import type { ReactNode } from 'react';
import Header from './Header';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
    </>
  );
}
