import { BlockMath, InlineMath } from 'react-katex';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function AnswerChoice({
  index,
  text,
  selected,
  struck,
  showStrike,
  onSelect,
  onToggleStrike,
  katex,
}) {
  const letter = LETTERS[index];
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onSelect}
        className={`answer-card flex-1 flex items-center gap-3 px-4 py-[10px] rounded-md border bg-white text-left ${
          selected ? 'border-bb-blue ring-2 ring-bb-blue' : 'border-[#515151]'
        } ${struck ? 'opacity-60' : ''}`}
      >
        <span
          className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-semibold border ${
            selected
              ? 'bg-bb-blue text-white border-bb-blue'
              : 'bg-white text-bb-textDark border-[#515151]'
          }`}
        >
          {letter}
        </span>
        <span className={`font-question text-[15px] leading-5 flex-1 ${struck ? 'strike-line' : ''}`}>
          {katex ? <InlineMath math={text} /> : text}
        </span>
      </button>

      <button
        onClick={onToggleStrike}
        title={struck ? 'Undo strikethrough' : 'Cross out this option'}
        className="w-5 h-5 rounded-full border border-[#515151] text-[11px] font-semibold inline-flex items-center justify-center text-bb-textDark hover:bg-gray-100 relative shrink-0"
      >
        {letter}
        <span className="absolute left-0 right-0 top-1/2 h-[1.5px] bg-[#515151]" />
      </button>
    </div>
  );
}
