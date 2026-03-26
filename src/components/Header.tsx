import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#EF1C31" />
              <text x="5" y="16" fontSize="10" fontWeight="bold" fill="white" fontFamily="Inter">aw</text>
            </svg>
          </div>
          <span className={styles.logoText}>
            <span className={styles.logoAt}>at-</span>
            <span className={styles.logoWork}>work</span>
          </span>
        </div>

        <div className={styles.nav}>
          <div className={styles.icons}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="#595959" strokeWidth="1.5" fill="none"/>
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill="#595959"/>
            </svg>
          </div>
          <div className={styles.user}>
            <img
              src="https://i.pravatar.cc/20?img=12"
              alt="avatar"
              className={styles.userAvatar}
            />
            <span className={styles.userName}>Ivan1234</span>
          </div>
        </div>
      </div>
    </header>
  );
}
