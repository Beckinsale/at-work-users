import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { fetchUser } from '../api/users';
import Header from '../components/Header';
import Popup from '../components/Popup';
import styles from './EditUserPage.module.scss';

const schema = z.object({
  name: z.string().min(2, 'Минимум 2 символа').max(64, 'Максимум 64 символа'),
  username: z.string().min(2, 'Минимум 2 символа').max(64, 'Максимум 64 символа'),
  email: z.string().email('Некорректный email'),
  city: z.string().min(2, 'Минимум 2 символа').max(64, 'Максимум 64 символа'),
  phone: z.string().regex(/^\d+$/, 'Только цифры'),
  company: z.string().min(2, 'Минимум 2 символа').max(64, 'Максимум 64 символа'),
});

type FormData = z.infer<typeof schema>;

function getAvatarUrl(id: number) {
  return `https://i.pravatar.cc/200?img=${id}`;
}

export default function EditUserPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const userId = Number(id);

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    enabled: userId > 0,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    values: user
      ? {
          name: user.name,
          username: user.username,
          email: user.email,
          city: user.address.city,
          phone: user.phone.replace(/\D/g, ''),
          company: user.company.name,
        }
      : undefined,
  });

  if (isLoading) {
    return (
      <>
        <Header />
        <div className={styles.status}>Загрузка данных пользователя...</div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Header />
        <div className={styles.status}>Ошибка загрузки данных</div>
      </>
    );
  }

  const onSubmit = (_data: FormData) => {
    setShowPopup(true);
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <button className={styles.back} onClick={() => navigate('/')}>
          ← Назад
        </button>

        <div className={styles.container}>
          <aside className={styles.sidebar}>
            <img
              src={getAvatarUrl(user.id)}
              alt={user.username}
              className={styles.avatar}
            />
            <h3 className={styles.sidebarTitle}>Данные профиля</h3>
            <nav className={styles.categories}>
              <button className={styles.category}>Рабочее пространство</button>
              <button className={styles.category}>Приватность</button>
              <button className={styles.category}>Безопасность</button>
            </nav>
          </aside>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Данные профиля</h2>
            </div>

            <div className={styles.fieldsWrapper}>
              <div className={styles.field}>
                <label className={styles.label}>Имя</label>
                <input
                  {...register('name')}
                  className={styles.input}
                  placeholder="Имя"
                />
                {errors.name && <span className={styles.error}>{errors.name.message}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Никнейм</label>
                <input
                  {...register('username')}
                  className={styles.input}
                  placeholder="Никнейм"
                />
                {errors.username && <span className={styles.error}>{errors.username.message}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Почта</label>
                <input
                  {...register('email')}
                  className={styles.input}
                  placeholder="Email"
                />
                {errors.email && <span className={styles.error}>{errors.email.message}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Город</label>
                <input
                  {...register('city')}
                  className={styles.input}
                  placeholder="Город"
                />
                {errors.city && <span className={styles.error}>{errors.city.message}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Телефон</label>
                <input
                  {...register('phone')}
                  className={styles.input}
                  placeholder="Телефон"
                  inputMode="numeric"
                />
                {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Название компании</label>
                <input
                  {...register('company')}
                  className={styles.input}
                  placeholder="Компания"
                />
                {errors.company && <span className={styles.error}>{errors.company.message}</span>}
              </div>
            </div>

            <button type="submit" className={styles.submit}>
              Сохранить
            </button>
          </form>
        </div>

        {showPopup && (
          <Popup
            message="Изменения сохранены"
            onClose={() => setShowPopup(false)}
          />
        )}
      </main>
    </>
  );
}
