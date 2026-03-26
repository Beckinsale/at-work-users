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
                <svg width="4" height="16" viewBox="0 0 4 16" fill="none">
                  <circle cx="2" cy="2" r="2" fill="#161616" />
                  <circle cx="2" cy="8" r="2" fill="#161616" />
                  <circle cx="2" cy="14" r="2" fill="#161616" />
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
