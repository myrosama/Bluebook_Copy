import { useState } from 'react';
import { InlineMath } from 'react-katex';
import AnswerChoice from './AnswerChoice.jsx';
import MarkForReview from './MarkForReview.jsx';
import StrikethroughToggle from './StrikethroughToggle.jsx';

// Render text with $...$ KaTeX inline segments
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
    <div className="w-full h-full overflow-y-auto thin-scroll px-10 pt-6 pb-10">
      <div className="max-w-[760px] mx-auto">
        <div className="flex items-center justify-between gap-3 mb-1">
          <div className="flex items-center gap-3">
            <span className="bg-bb-textDark text-white text-[14px] font-semibold rounded-sm w-7 h-7 inline-flex items-center justify-center">
              {qIndex + 1}
            </span>
            <MarkForReview marked={marked} onToggle={onToggleMark} />
          </div>
          {!isFRQ && (
            <StrikethroughToggle active={strikeMode} onToggle={() => setStrikeMode((v) => !v)} />
          )}
        </div>
        <div className="dashed-sep mb-5" />

        <div className="font-question mb-6">{renderMath(question.prompt)}</div>

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
  );
}
