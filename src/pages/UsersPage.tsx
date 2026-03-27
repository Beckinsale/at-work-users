import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/users';
import { useUserStore } from '../store/userStore';
import UserCard from '../components/UserCard';
import styles from './UsersPage.module.scss';

export default function UsersPage() {
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const { archivedUserIds, hiddenUserIds } = useUserStore();

  if (isLoading) {
    return <div className={styles.status}>Загрузка пользователей...</div>;
  }

  if (!users) {
    return <div className={styles.status}>Ошибка загрузки данных</div>;
  }

  const activeUsers = users.filter(
    (user) => !archivedUserIds.includes(user.id) && !hiddenUserIds.includes(user.id)
  );

  const archivedUsers = users.filter((user) => archivedUserIds.includes(user.id));

  return (
    <>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Активные</h2>
        {activeUsers.length === 0 ? (
          <p className={styles.empty}>Нет активных пользователей</p>
        ) : (
          <div className={styles.grid}>
            {activeUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </section>

      {archivedUsers.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Архив</h2>
          <div className={styles.grid}>
            {archivedUsers.map((user) => (
              <UserCard key={user.id} user={user} isArchived />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
