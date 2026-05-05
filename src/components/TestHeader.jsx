import { useState } from 'react';
import DirectionsModal from './DirectionsModal.jsx';

const formatTime = (sec) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export default function TestHeader({
  module,
  timeLeft,
  hidden,
  setHidden,
  onOpenCalculator,
  onOpenReference,
  onOpenHighlights,
}) {
  const [showDirections, setShowDirections] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const isMath = module.type === 'math';

  return (
    <header className="relative h-[78px] bg-bb-headerBg flex items-stretch px-8">
      {/* Left: section + directions */}
      <div className="flex flex-col justify-center min-w-[320px]">
        <div className="text-[16px] font-semibold text-bb-textDark">{module.sectionLabel}</div>
        <button
          onClick={() => setShowDirections((v) => !v)}
          className="text-[14px] text-bb-textDark mt-1 inline-flex items-center gap-1 w-fit hover:underline"
        >
          Directions
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className={showDirections ? 'rotate-180' : ''}>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>

      {/* Center: timer */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {!hidden ? (
          <div className="text-[28px] font-semibold tabular-nums text-bb-textDark">
            {formatTime(timeLeft)}
          </div>
        ) : (
          <div className="text-[14px] text-bb-textDark py-2">More Time on This Section</div>
        )}
        <button
          onClick={() => setHidden((v) => !v)}
          className="text-[12px] px-4 py-[2px] rounded-full border border-bb-textDark text-bb-textDark hover:bg-white"
        >
          {hidden ? 'Show' : 'Hide'}
        </button>
      </div>

      {/* Right: tools */}
      <div className="flex items-center gap-6 min-w-[320px] justify-end">
        {isMath ? (
          <>
            <ToolButton onClick={onOpenCalculator} label="Calculator">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="5" y="3" width="14" height="18" rx="2" />
                <rect x="7" y="6" width="10" height="3" />
                <circle cx="9" cy="13" r="0.7" fill="currentColor" />
                <circle cx="12" cy="13" r="0.7" fill="currentColor" />
                <circle cx="15" cy="13" r="0.7" fill="currentColor" />
                <circle cx="9" cy="16" r="0.7" fill="currentColor" />
                <circle cx="12" cy="16" r="0.7" fill="currentColor" />
                <circle cx="15" cy="16" r="0.7" fill="currentColor" />
              </svg>
            </ToolButton>
            <ToolButton onClick={onOpenReference} label="Reference">
              <span className="text-[18px] italic font-serif font-semibold">x²</span>
            </ToolButton>
          </>
        ) : (
          <ToolButton onClick={onOpenHighlights} label="Highlights & Notes">
            <div className="flex items-center gap-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 19l-7 2 2-7L19 5l5 5L12 19z" />
              </svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="5" y="3" width="14" height="18" rx="1" />
                <line x1="8" y1="8" x2="16" y2="8" />
                <line x1="8" y1="12" x2="16" y2="12" />
                <line x1="8" y1="16" x2="13" y2="16" />
              </svg>
            </div>
          </ToolButton>
        )}
        <ToolButton onClick={() => setShowMore((v) => !v)} label="More">
          <div className="flex flex-col gap-[3px]">
            <div className="w-[3px] h-[3px] bg-bb-textDark rounded-full" />
            <div className="w-[3px] h-[3px] bg-bb-textDark rounded-full" />
            <div className="w-[3px] h-[3px] bg-bb-textDark rounded-full" />
          </div>
        </ToolButton>
      </div>

      {/* Battery indicator (top-right corner) */}
      <div className="absolute top-2 right-2 flex items-center gap-1 text-[11px] text-bb-textDark">
        <span>100%</span>
        <span className="battery"><span className="battery-fill" /></span>
      </div>

      {showDirections && (
        <DirectionsModal type={module.type} onClose={() => setShowDirections(false)} />
      )}

      {showMore && (
        <div className="absolute right-6 top-[78px] bg-white shadow-popover rounded-md border border-bb-border w-[200px] z-30">
          <button className="w-full text-left px-4 py-2 text-[14px] hover:bg-gray-50" onClick={() => setShowMore(false)}>Help</button>
          <button className="w-full text-left px-4 py-2 text-[14px] hover:bg-gray-50" onClick={() => setShowMore(false)}>Keyboard Shortcuts</button>
          <button className="w-full text-left px-4 py-2 text-[14px] hover:bg-gray-50" onClick={() => setShowMore(false)}>Save & Exit</button>
        </div>
      )}
    </header>
  );
}

function ToolButton({ onClick, label, children }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-1 text-[12px] text-bb-textDark min-w-[56px] hover:opacity-80"
    >
      <div className="h-[22px] flex items-center justify-center">{children}</div>
      <span>{label}</span>
    </button>
  );
}
