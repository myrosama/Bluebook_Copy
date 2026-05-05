import { useRef, useState, useEffect } from 'react';
import AnswerChoice from './AnswerChoice.jsx';
import MarkForReview from './MarkForReview.jsx';
import StrikethroughToggle from './StrikethroughToggle.jsx';

export default function EBRWQuestion({
  question,
  qIndex,
  selected,
  marked,
  strikes,
  onSelect,
  onToggleMark,
  onStrikethrough,
}) {
  const [strikeMode, setStrikeMode] = useState(false);
  const [leftPercent, setLeftPercent] = useState(50);
  const containerRef = useRef(null);
  const dragRef = useRef({ dragging: false });

  useEffect(() => {
    const move = (e) => {
      if (!dragRef.current.dragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setLeftPercent(Math.min(80, Math.max(20, pct)));
    };
    const up = () => (dragRef.current.dragging = false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
  }, []);

  const struckSet = new Set(strikes || []);
  const passageLines = question.passage?.split('\n') || [];

  return (
    <div ref={containerRef} className="flex w-full h-full relative">
      {/* Left passage */}
      <div
        style={{ width: `${leftPercent}%` }}
        className="overflow-y-auto thin-scroll px-10 pt-8 pb-10 font-question"
      >
        {passageLines.map((line, i) => (
          <p key={i} className={i > 0 ? 'mt-3' : ''}>
            {line}
          </p>
        ))}
      </div>

      {/* Divider */}
      <div className="relative w-[1px] bg-bb-textDark/40 self-stretch flex items-center justify-center">
        <button
          onMouseDown={() => (dragRef.current.dragging = true)}
          className="absolute -left-3 w-7 h-9 bg-white border border-bb-textDark/60 rounded shadow-sm flex items-center justify-center cursor-col-resize"
          aria-label="Resize"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 6-4 6 4 6" />
            <path d="m15 6 4 6-4 6" />
          </svg>
        </button>
      </div>

      {/* Right question */}
      <div
        style={{ width: `${100 - leftPercent}%` }}
        className="overflow-y-auto thin-scroll px-10 pt-6 pb-10"
      >
        <div className="max-w-[640px] mx-auto">
          <div className="flex items-center justify-between gap-3 mb-1">
            <div className="flex items-center gap-3">
              <span className="bg-bb-textDark text-white text-[14px] font-semibold rounded-sm w-7 h-7 inline-flex items-center justify-center">
                {qIndex + 1}
              </span>
              <MarkForReview marked={marked} onToggle={onToggleMark} />
            </div>
            <StrikethroughToggle active={strikeMode} onToggle={() => setStrikeMode((v) => !v)} />
          </div>
          <div className="dashed-sep mb-5" />

          <p className="font-question mb-5">{question.prompt}</p>

          <div className="space-y-3">
            {question.choices.map((choice, i) => (
              <AnswerChoice
                key={i}
                index={i}
                text={choice}
                selected={selected === i}
                struck={struckSet.has(i)}
                showStrike={strikeMode}
                onSelect={() => onSelect(i)}
                onToggleStrike={() => onStrikethrough(i, !struckSet.has(i))}
                katex={question.choicesKatex}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
