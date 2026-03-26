import { useEffect } from 'react';
import styles from './Popup.module.scss';

interface Props {
  message: string;
  onClose: () => void;
}

export default function Popup({ message, onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          ✕
        </button>

        <div className={styles.checkmark}>
          <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
            <rect width="84" height="84" rx="20" fill="#D4EDDA" />
            <path
              d="M32 42L38 48L52 34"
              stroke="#28A745"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
}
