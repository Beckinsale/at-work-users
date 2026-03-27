import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { fetchUser } from '../api/users';
import Popup from '../components/Popup';
import ClearButton from '../components/ClearButton';
import styles from './EditUserPage.module.scss';

const schema = z.object({
  name: z.string().min(2, 'Минимум 2 символа').max(64, 'Максимум 64 символа'),
  username: z
    .string()
    .min(2, 'Минимум 2 символа')
    .max(64, 'Максимум 64 символа'),
  email: z.string().email('Некорректный email'),
  city: z.string().min(2, 'Минимум 2 символа').max(64, 'Максимум 64 символа'),
  phone: z
    .string()
    .refine((val) => {
      const cleaned = val.replace(/[\s\-()x]/gi, '');
      return /^\d+$/.test(cleaned);
    }, 'Только цифры'),
  company: z
    .string()
    .min(2, 'Минимум 2 символа')
    .max(64, 'Максимум 64 символа'),
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
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    values: user
      ? {
          name: user.name,
          username: user.username,
          email: user.email,
          city: user.address.city,
          phone: user.phone,
          company: user.company.name,
        }
      : undefined,
  });

  if (isLoading) {
    return <div className={styles.status}>Загрузка данных пользователя...</div>;
  }

  if (!user) {
    return <div className={styles.status}>Ошибка загрузки данных</div>;
  }

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    setShowPopup(true);
  };

  const createInputField = (
    name: keyof FormData,
    label: string,
    placeholder: string,
    inputMode?: 'numeric',
  ) => (
    <div key={name} className={styles.field}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          {...register(name)}
          className={styles.input}
          placeholder={placeholder}
          inputMode={inputMode}
        />
        {watch(name) && (
          <ClearButton
            onClick={() => setValue(name, '')}
            className={styles.clearButton}
          />
        )}
      </div>
      {errors[name] && (
        <span className={styles.error}>{errors[name]?.message}</span>
      )}
    </div>
  );

  return (
    <>
      <button className={styles.back} onClick={() => navigate('/')}>
        <div className={styles.backArrow}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            className={styles.desktopArrow}
          >
            <path
              d="M13.125 10.5H0.875"
              stroke="var(--02, #595959)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 16.625L0.875 10.5L7 4.375"
              stroke="var(--02, #595959)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            className={styles.mobileArrow}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.28033 9.28033C4.98744 9.57322 4.51256 9.57322 4.21967 9.28033L0.21967 5.28033C-0.0732231 4.98744 -0.0732231 4.51256 0.21967 4.21967L4.21967 0.21967C4.51256 -0.0732233 4.98744 -0.0732233 5.28033 0.21967C5.57322 0.512563 5.57322 0.987437 5.28033 1.28033L1.81066 4.75L5.28033 8.21967C5.57322 8.51256 5.57322 8.98744 5.28033 9.28033Z"
              fill="var(--02, #595959)"
            />
          </svg>
        </div>
        <span className={styles.backArticle}>Назад</span>
      </button>

      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <img
            src={getAvatarUrl(user.id)}
            alt={user.username}
            className={styles.avatar}
          />
          <nav className={styles.categories}>
            <div className={styles.categoryItem}>
              <p
                className={`${styles.categoryText} ${styles.categoryTextActive}`}
              >
                Данные профиля
              </p>
              <div className={styles.categoryLine} />
            </div>
            <div className={styles.categoryItem}>
              <p className={styles.categoryText}>Рабочее пространство</p>
              <div className={styles.categoryLine} />
            </div>
            <div className={styles.categoryItem}>
              <p className={styles.categoryText}>Приватность</p>
              <div className={styles.categoryLine} />
            </div>
            <div className={styles.categoryItem}>
              <p className={styles.categoryText}>Безопасность</p>
              <div className={styles.categoryLine} />
            </div>
          </nav>
        </aside>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Данные профиля</h2>
          </div>

          <div className={styles.formContent}>
            <div className={styles.fieldsWrapper}>
              {createInputField('name', 'Имя', 'Имя')}
              {createInputField('username', 'Никнейм', 'Никнейм')}
              {createInputField('email', 'Почта', 'Email')}
              {createInputField('city', 'Город', 'Город')}
              {createInputField('phone', 'Телефон', 'Телефон', 'numeric')}
              {createInputField('company', 'Название компании', 'Компания')}
            </div>

            <button type="submit" className={styles.submit}>
              Сохранить
            </button>
          </div>
        </form>
      </div>

      {showPopup && (
        <Popup
          message="Изменения сохранены!"
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
}
