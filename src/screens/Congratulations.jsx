import { useState, useMemo } from 'react';
import RateModal from '../components/RateModal.jsx';

const COLORS = ['#ffd54a', '#324dc7', '#ec4899', '#10b981', '#f97316', '#a855f7', '#ef4444'];

export default function Congratulations() {
  const [showRate, setShowRate] = useState(false);

  const confetti = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 6,
      color: COLORS[i % COLORS.length],
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
    }));
  }, []);

  return (
    <div className="min-h-screen bg-bb-navy relative overflow-hidden">
      <div className="h-12 bg-bb-headerBg flex items-center justify-between px-6 text-[14px] relative z-10">
        <button className="flex items-center gap-2 text-bb-textDark">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-bb-textDark text-[12px]">?</span>
          Help
        </button>
        <button className="flex items-center gap-2 text-bb-textDark">
          Return to Home
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 12 12 4l9 8" />
            <path d="M5 10v10h14V10" />
          </svg>
        </button>
      </div>

      {confetti.map((c) => (
        <div
          key={c.id}
          className="confetti-piece"
          style={{
            left: `${c.left}%`,
            background: c.color,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
            borderRadius: c.shape === 'circle' ? '50%' : '1px',
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center pt-14 px-6">
        <h1 className="text-white text-[28px] font-semibold mb-8">You're All Finished!</h1>

        <div className="bg-white rounded-md shadow-modal w-[640px] py-8 px-10 flex items-center gap-8 mb-10">
          <div className="shrink-0">
            <svg width="180" height="130" viewBox="0 0 200 140">
              <circle cx="100" cy="68" r="65" fill="#e8eaf6" opacity="0.5" />
              <rect x="40" y="30" width="120" height="78" rx="4" fill="#e5e7eb" stroke="#9ca3af" />
              <rect x="48" y="38" width="104" height="60" fill="#dbeafe" />
              <circle cx="100" cy="68" r="18" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5" />
              <circle cx="93" cy="64" r="2" fill="#1e3a8a" />
              <circle cx="107" cy="64" r="2" fill="#1e3a8a" />
              <path d="M91 73c2 4 14 4 18 0" stroke="#1e3a8a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <rect x="30" y="108" width="140" height="6" rx="2" fill="#9ca3af" />
              <circle cx="60" cy="40" r="2" fill="#fbbf24" />
              <circle cx="140" cy="92" r="2" fill="#ec4899" />
            </svg>
          </div>
          <div className="border-l border-bb-border h-[120px]" />
          <p className="font-question text-[16px] text-bb-textDark leading-relaxed">
            Congratulations on completing an SAT practice test! Review your answers to see how you did.
          </p>
        </div>

        <button
          onClick={() => setShowRate(true)}
          className="px-8 py-3 rounded-full bg-bb-yellow hover:bg-bb-yellowDark text-bb-textDark font-semibold text-[15px]"
        >
          View Your Score
        </button>
      </div>

      {showRate && <RateModal onClose={() => setShowRate(false)} />}
    </div>
  );
}
