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
        className={`answer-card flex-1 flex items-start gap-3 px-4 py-[14px] rounded-xl border bg-white text-left ${
          selected ? 'border-bb-blue ring-2 ring-bb-blue' : 'border-bb-border'
        } ${struck ? 'opacity-60' : ''}`}
      >
        <span
          className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-semibold border ${
            selected
              ? 'bg-bb-blue text-white border-bb-blue'
              : 'bg-white text-bb-textDark border-bb-textDark'
          }`}
        >
          {letter}
        </span>
        <span className={`font-question text-[15.5px] leading-relaxed flex-1 ${struck ? 'strike-line' : ''}`}>
          {katex ? <InlineMath math={text} /> : text}
        </span>
      </button>

      {showStrike && (
        <button
          onClick={onToggleStrike}
          title={struck ? 'Undo strikethrough' : 'Cross out this option'}
          className="w-7 h-7 rounded-full border border-bb-textDark text-[12px] font-semibold inline-flex items-center justify-center text-bb-textDark hover:bg-gray-100 relative"
        >
          {letter}
          <span className="absolute left-0 right-0 top-1/2 h-[1.5px] bg-bb-textDark rotate-[-12deg]" />
        </button>
      )}
    </div>
  );
}
