import { useEffect, useState } from 'react';

export default function Upload() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let p = 0;
    const t = setInterval(() => {
      p = Math.min(100, p + Math.ceil(Math.random() * 8) + 2);
      setPct(p);
      if (p >= 100) clearInterval(t);
    }, 280);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-bb-pageBg flex flex-col">
      <div className="h-12 bg-white border-b border-bb-border flex items-center justify-between px-6 text-[14px]">
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

      <div className="flex-1 flex flex-col items-center pt-16 px-6">
        <h1 className="text-[26px] font-medium text-bb-textDark mb-3">Digital Practice Is Over: Stand By!</h1>
        <p className="text-center text-[15px] text-bb-textDark max-w-[480px] mb-8">
          All your work has been saved, and we're uploading it now. Do not refresh this page or quit the app.
        </p>

        <div className="bg-white border border-bb-border rounded-md p-10 w-[460px] flex flex-col items-center">
          <div className="relative w-20 h-20 mb-2">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="14" stroke="#e5e7eb" strokeWidth="2.5" fill="none" />
              <circle
                cx="18"
                cy="18"
                r="14"
                stroke="#1a2c5b"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray={`${(pct * 88) / 100} 88`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[14px] font-semibold text-bb-navy">
              {pct}%
            </div>
          </div>

          <svg width="180" height="120" viewBox="0 0 200 140" className="my-3">
            <rect x="35" y="30" width="130" height="80" rx="4" fill="#e5e7eb" stroke="#9ca3af" />
            <rect x="45" y="40" width="110" height="60" fill="white" stroke="#9ca3af" />
            <path d="M100 90 L100 55 M85 70 L100 55 L115 70" stroke="#1a2c5b" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="20" y="110" width="160" height="8" rx="2" fill="#d1d5db" />
          </svg>

          <p className="text-[12px] text-bb-textDark mt-2 text-center">
            If this screen doesn't update in a few minutes, hit
          </p>
          <p className="text-[14px] font-semibold text-bb-textDark">Return to Home</p>
        </div>
      </div>
    </div>
  );
}
