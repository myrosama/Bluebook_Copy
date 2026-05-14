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
        className="overflow-y-auto thin-scroll px-10 pt-[5px] pb-10 font-question bg-white"
      >
        {passageLines.map((line, i) => (
          <p key={i} className={i > 0 ? 'mt-3' : ''}>
            {line}
          </p>
        ))}
      </div>

      {/* Divider */}
      <div className="relative w-1 bg-[#888] self-stretch flex items-center justify-center">
        <button
          onMouseDown={() => (dragRef.current.dragging = true)}
          className="absolute -left-[3px] top-1/2 -translate-y-1/2 w-2.5 h-[22px] bg-[#1e1e1e] rounded-sm flex items-center justify-center cursor-col-resize"
          aria-label="Resize"
        >
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
            <line x1="2" y1="1" x2="2" y2="9" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="4" y1="1" x2="4" y2="9" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Right question */}
      <div
        style={{ width: `${100 - leftPercent}%` }}
        className="flex flex-col h-full"
      >
        {/* Gray question header row */}
        <div className="bg-[#f0f0f0] w-full shrink-0">
          <div className="px-10 py-[3px] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="bg-bb-textDark text-white text-[12px] font-bold rounded-sm w-5 h-[19px] inline-flex items-center justify-center shrink-0">
                {qIndex + 1}
              </span>
              <MarkForReview marked={marked} onToggle={onToggleMark} />
            </div>
            <StrikethroughToggle active={strikeMode} onToggle={() => setStrikeMode((v) => !v)} />
          </div>
        </div>

        {/* Dashed separator */}
        <div className="dashed-sep shrink-0" />

        {/* Scrollable question content */}
        <div className="flex-1 overflow-y-auto thin-scroll px-10 pt-5 pb-10">
          <div className="max-w-[640px]">
            <p className="font-question mb-5 mt-1">{question.prompt}</p>

            <div className="space-y-[14px]">
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
    </div>
  );
}
