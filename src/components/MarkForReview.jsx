export default function MarkForReview({ marked, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="inline-flex items-center gap-1 text-[14px] text-bb-textDark hover:underline"
    >
      <svg width="16" height="18" viewBox="0 0 24 24" fill={marked ? '#c62828' : 'none'} stroke="currentColor" strokeWidth="1.6">
        <path d="M6 3h12v18l-6-4-6 4z" />
      </svg>
      Mark for Review
    </button>
  );
}
