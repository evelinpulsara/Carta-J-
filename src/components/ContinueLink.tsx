export default function ContinueLink({
  label = "Seguir leyendo",
  onClick,
  light = false,
}: {
  label?: string;
  onClick: () => void;
  light?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`font-hand text-xl mt-10 flex items-center gap-2 ${
        light ? "text-[#cfd6ea]" : "text-[var(--ink-soft)]"
      }`}
    >
      {label}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
