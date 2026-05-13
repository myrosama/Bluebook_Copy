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
    <>
    <header className="relative h-[80px] bg-bb-headerBg flex items-stretch px-8">
      {/* Left: section + directions */}
      <div className="flex flex-col justify-center min-w-[320px]">
        <div className="text-[16px] font-bold text-bb-textDark leading-tight tracking-tight">{module.sectionLabel}</div>
        <button
          onClick={() => setShowDirections((v) => !v)}
          className="text-[14px] text-bb-textDark mt-1 inline-flex items-center gap-1 w-fit hover:underline"
        >
          Directions
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" className={showDirections ? 'rotate-180' : ''}>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>

      {/* Center: timer */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {!hidden ? (
          <div className="text-[22px] font-bold tabular-nums text-bb-textDark leading-none">
            {formatTime(timeLeft)}
          </div>
        ) : (
          <div className="text-[14px] text-bb-textDark py-2">More Time on This Section</div>
        )}
        <button
          onClick={() => setHidden((v) => !v)}
          className="mt-1.5 text-[12px] px-3.5 py-[1px] rounded-full border border-bb-textDark text-bb-textDark hover:bg-white"
        >
          {hidden ? 'Show' : 'Hide'}
        </button>
      </div>

      {/* Right: tools */}
      <div className="flex items-center gap-7 min-w-[320px] justify-end">
        {isMath ? (
          <>
            <ToolButton onClick={onOpenCalculator} label="Calculator">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="5" y="3" width="14" height="18" rx="1.5" />
                <rect x="7" y="6" width="10" height="3" rx="0.5" />
                <circle cx="9" cy="13" r="0.7" fill="currentColor" />
                <circle cx="12" cy="13" r="0.7" fill="currentColor" />
                <circle cx="15" cy="13" r="0.7" fill="currentColor" />
                <circle cx="9" cy="16" r="0.7" fill="currentColor" />
                <circle cx="12" cy="16" r="0.7" fill="currentColor" />
                <circle cx="15" cy="16" r="0.7" fill="currentColor" />
              </svg>
            </ToolButton>
            <ToolButton onClick={onOpenReference} label="Reference">
              <span className="text-[17px] italic font-serif font-bold">x²</span>
            </ToolButton>
          </>
        ) : (
          <ToolButton onClick={onOpenHighlights} label="Highlights & Notes">
            <div className="flex items-center gap-1.5">
              {/* Pencil/highlighter icon */}
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 5 4 4" />
                <path d="M19.5 4.5a1.8 1.8 0 0 0-2.5 0L4.5 17 3 21l4-1.5L19.5 7a1.8 1.8 0 0 0 0-2.5z" />
              </svg>
              {/* Notes/document icon */}
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 3h11l3 3v15H5z" />
                <path d="M16 3v3h3" />
                <line x1="8" y1="11" x2="16" y2="11" />
                <line x1="8" y1="15" x2="16" y2="15" />
                <line x1="8" y1="19" x2="13" y2="19" />
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

      {/* Battery indicator (very top-right corner) */}
      <div className="absolute top-1 right-3 flex items-center gap-1 text-[10px] text-bb-textDark">
        <span>78%</span>
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
    {/* Dashed divider line below the navbar */}
    <div
      className="h-[2px]"
      style={{
        backgroundImage:
          'repeating-linear-gradient(to right, #000 0px, #000 23px, #fff 23px, #fff 25px)',
      }}
    />
    </>
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
