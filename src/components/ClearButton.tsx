interface ClearButtonProps {
  onClick: () => void;
  className: string;
}

export default function ClearButton({ onClick, className }: ClearButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Clear field"
      className={className}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 10 10"
        fill="none"
      >
        <path
          d="M9.5 0.5L0.5 9.5M0.5 0.5L9.5 9.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          color="var(--color-02)"
        />
      </svg>
    </button>
  );
}
