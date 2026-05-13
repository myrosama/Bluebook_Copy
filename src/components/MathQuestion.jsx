import { useState } from 'react';
import { InlineMath } from 'react-katex';
import AnswerChoice from './AnswerChoice.jsx';
import MarkForReview from './MarkForReview.jsx';
import StrikethroughToggle from './StrikethroughToggle.jsx';

function renderMath(text) {
  if (!text) return null;
  const parts = text.split(/(\$[^$]+\$)/g);
  return parts.map((p, i) => {
    if (p.startsWith('$') && p.endsWith('$')) {
      return <InlineMath key={i} math={p.slice(1, -1)} />;
    }
    return <span key={i}>{p}</span>;
  });
}

export default function MathQuestion({
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
  const [frqValue, setFrqValue] = useState(selected ?? '');
  const isFRQ = question.type === 'math-frq';
  const struckSet = new Set(strikes || []);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Gray question header row */}
      <div className="bg-[#f0f0f0] w-full shrink-0">
        <div className="max-w-[760px] mx-auto px-10 py-[7px] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="bg-bb-textDark text-white text-[12px] font-bold rounded-sm w-6 h-6 inline-flex items-center justify-center shrink-0">
              {qIndex + 1}
            </span>
            <MarkForReview marked={marked} onToggle={onToggleMark} />
          </div>
          {!isFRQ && (
            <StrikethroughToggle active={strikeMode} onToggle={() => setStrikeMode((v) => !v)} />
          )}
        </div>
      </div>

      {/* Dashed separator */}
      <div className="dashed-sep shrink-0" />

      {/* Scrollable question content */}
      <div className="flex-1 overflow-y-auto thin-scroll px-10 pt-5 pb-10">
        <div className="max-w-[760px] mx-auto">
          <div className="font-question mb-6 mt-1">{renderMath(question.prompt)}</div>

          {isFRQ ? (
            <div>
              <div className="border-2 border-bb-textDark/70 rounded-md w-[200px] h-[44px] flex items-center px-3 bg-white">
                <input
                  value={frqValue}
                  onChange={(e) => {
                    setFrqValue(e.target.value);
                    onSelect(e.target.value);
                  }}
                  className="w-full outline-none text-[18px] font-question"
                />
              </div>
              <div className="mt-8">
                <div className="font-semibold text-[15px] mb-2">Answer Preview:</div>
                <div className="font-question text-[18px] min-h-[28px]">
                  {frqValue && /[\d./-]/.test(frqValue) ? (
                    <InlineMath math={frqValue} />
                  ) : (
                    frqValue
                  )}
                </div>
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}
