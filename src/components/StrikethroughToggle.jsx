export default function StrikethroughToggle({ active, onToggle }) {
  return (
    <button
      onClick={onToggle}
      title="Cross out answer choices"
      className={`w-[26px] h-[19px] rounded-sm inline-flex items-center justify-center text-[10px] font-bold relative ${
        active ? 'bg-bb-navyDark text-white' : 'bg-bb-blue text-white'
      }`}
    >
      ABC
      <span className="absolute left-1 right-1 top-1/2 h-[1.5px] bg-white" />
    </button>
  );
}
