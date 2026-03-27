import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types/user';
import { useUserStore } from '../store/userStore';
import styles from './UserCard.module.scss';

interface UserCardProps {
  user: User;
  isArchived?: boolean;
}

function getAvatarUrl(id: number) {
  return `https://i.pravatar.cc/120?img=${id}`;
}

export default function UserCard({ user, isArchived = false }: UserCardProps) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { archiveUser, unarchiveUser, hideUser } = useUserStore();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`${styles.card} ${isArchived ? styles.archived : ''}`}>
      <img
        src={getAvatarUrl(user.id)}
        alt={user.username}
        className={styles.avatar}
      />

      <div className={styles.info}>
        <div className={styles.top}>
          <div className={styles.usernameRow}>
            <p className={styles.username}>{user.username}</p>
            <div className={styles.menuWrap} ref={menuRef}>
              <button
                className={styles.menuBtn}
                onClick={() => setMenuOpen((val) => !val)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="16" viewBox="0 0 4 16" fill="none" className={styles.desktopIcon}>
                  <path d="M0 14C0 15.1 0.9 16 2 16C3.1 16 4 15.1 4 14C4 12.9 3.1 12 2 12C0.9 12 0 12.9 0 14ZM0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2ZM0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6C0.9 6 0 6.9 0 8Z" fill="var(--01, #161616)"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="3" height="10" viewBox="0 0 3 10" fill="none" className={styles.mobileIcon}>
                  <path d="M0 8.75C0 9.4375 0.5625 10 1.25 10C1.9375 10 2.5 9.4375 2.5 8.75C2.5 8.0625 1.9375 7.5 1.25 7.5C0.5625 7.5 0 8.0625 0 8.75ZM0 1.25C0 1.9375 0.5625 2.5 1.25 2.5C1.9375 2.5 2.5 1.9375 2.5 1.25C2.5 0.5625 1.9375 0 1.25 0C0.5625 0 0 0.5625 0 1.25ZM0 5C0 5.6875 0.5625 6.25 1.25 6.25C1.9375 6.25 2.5 5.6875 2.5 5C2.5 4.3125 1.9375 3.75 1.25 3.75C0.5625 3.75 0 4.3125 0 5Z" fill="var(--01, #161616)"/>
                </svg>
              </button>

              {menuOpen && (
                <div className={styles.dropdown}>
                  {!isArchived ? (
                    <>
                      <button
                        className={styles.dropdownItem}
                        onClick={() => { navigate(`/users/${user.id}`); setMenuOpen(false); }}
                      >
                        Редактировать
                      </button>
                      <button
                        className={styles.dropdownItem}
                        onClick={() => { archiveUser(user.id); setMenuOpen(false); }}
                      >
                        Архивировать
                      </button>
                      <button
                        className={styles.dropdownItem}
                        onClick={() => { hideUser(user.id); setMenuOpen(false); }}
                      >
                        Скрыть
                      </button>
                    </>
                  ) : (
                    <button
                      className={styles.dropdownItem}
                      onClick={() => { unarchiveUser(user.id); setMenuOpen(false); }}
                    >
                      Активировать
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          <p className={styles.company}>{user.company.name}</p>
        </div>
        <p className={styles.city}>{user.address.city}</p>
      </div>
    </div>
  );
}
