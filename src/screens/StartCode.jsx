import { useState, useRef, useEffect } from 'react';

export default function StartCode({ onStart }) {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const refs = useRef([]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  const filled = digits.every((d) => /^\d$/.test(d));

  const setDigit = (i, v) => {
    const ch = v.replace(/\D/g, '').slice(0, 1);
    setDigits((prev) => {
      const next = [...prev];
      next[i] = ch;
      return next;
    });
    if (ch && i < 5) refs.current[i + 1]?.focus();
  };

  const onKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const onPaste = (e) => {
    const txt = (e.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, 6);
    if (!txt) return;
    e.preventDefault();
    setDigits(txt.padEnd(6, ' ').slice(0, 6).split('').map((c) => (c === ' ' ? '' : c)));
    refs.current[Math.min(txt.length, 5)]?.focus();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header — same container as Test Security */}
      <header className="bg-white border-b border-bb-border">
        <div className="max-w-[1040px] mx-auto h-[52px] px-8 flex items-center justify-between text-[15px]">
          <button className="flex items-center gap-2 text-bb-textDark">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7v.5" strokeLinecap="round" />
              <circle cx="12" cy="17" r="0.8" fill="currentColor" />
            </svg>
            Help
          </button>
          <button className="flex items-center gap-2 text-bb-textDark">
            Return to Home
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 11 12 3l9 8" />
              <path d="M5 9.5V21h14V9.5" />
            </svg>
          </button>
        </div>
      </header>

      {/* Body — mint green, content in same container */}
      <main className="flex-1 bg-bb-mintGreen flex flex-col">
        <div className="max-w-[1040px] mx-auto w-full px-8 flex flex-col items-center pt-12 pb-8 flex-1">
          <h1 className="text-[34px] font-normal text-bb-textDark mb-10">Start Code</h1>

          <p className="text-[15px] text-bb-textDark mb-1">
            Enter your start code now to begin testing. Good luck!
          </p>
          <p className="text-[15px] text-bb-textDark mb-8">
            The start code contains <span className="font-bold">numbers only</span>.
          </p>

          <div className="flex gap-2.5 mb-8">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => (refs.current[i] = el)}
                value={d}
                inputMode="numeric"
                onChange={(e) => setDigit(i, e.target.value)}
                onKeyDown={(e) => onKeyDown(i, e)}
                onPaste={onPaste}
                maxLength={1}
                className="w-[58px] h-[58px] bg-white border border-bb-textDark rounded-lg text-center text-[28px] font-medium text-bb-textDark shadow-sm focus:ring-2 focus:ring-bb-blue"
              />
            ))}
          </div>

          <button
            disabled={!filled}
            onClick={() => filled && onStart()}
            className={`px-7 py-2.5 rounded-full text-[14px] font-semibold ${
              filled
                ? 'bg-bb-yellow hover:bg-bb-yellowDark text-bb-textDark cursor-pointer'
                : 'bg-bb-yellow/55 text-bb-textDark/55 cursor-not-allowed'
            }`}
          >
            Start Test
          </button>

          <div className="flex-1" />
          <p className="text-[14px] text-bb-textDark text-center pb-2">
            You can <a className="text-bb-blue underline">review the instructions</a> that the proctor reads aloud.
          </p>
        </div>
      </main>
    </div>
  );
}
