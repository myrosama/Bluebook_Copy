export default function StrikethroughToggle({ active, onToggle }) {
  return (
    <button
      onClick={onToggle}
      title="Cross out answer choices"
      className={`w-9 h-7 rounded-md inline-flex items-center justify-center text-[10px] font-bold relative ${
        active ? 'bg-bb-blue text-white' : 'bg-white border border-bb-border text-bb-textDark'
      }`}
    >
      ABC
      <span className={`absolute left-1 right-1 top-1/2 h-[1.5px] ${active ? 'bg-white' : 'bg-bb-textDark'}`} />
    </button>
  );
}
