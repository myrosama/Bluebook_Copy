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
      <div className="h-12 bg-white border-b border-bb-border flex items-center justify-between px-6 text-[14px]">
        <button className="flex items-center gap-2 text-bb-textDark hover:underline">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-bb-textDark text-[12px]">?</span>
          Help
        </button>
        <button className="flex items-center gap-2 text-bb-textDark hover:underline">
          Return to Home
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 12 12 4l9 8" />
            <path d="M5 10v10h14V10" />
          </svg>
        </button>
      </div>

      <div className="flex-1 bg-bb-mintGreen flex flex-col items-center pt-16 pb-12 px-6">
        <h1 className="text-[44px] font-medium text-bb-textDark mb-12">Start Code</h1>
        <p className="text-[18px] text-bb-textDark mb-2">
          Enter your start code now to begin testing. Good luck!
        </p>
        <p className="text-[18px] text-bb-textDark mb-12">
          The start code contains <span className="font-bold">numbers only</span>.
        </p>

        <div className="flex gap-3 mb-10">
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
              className="w-[80px] h-[80px] bg-white border border-bb-textDark rounded-xl text-center text-[40px] font-medium text-bb-textDark outline-none shadow-sm focus:ring-2 focus:ring-bb-blue"
            />
          ))}
        </div>

        <button
          disabled={!filled}
          onClick={() => filled && onStart()}
          className={`px-8 py-3 rounded-full text-[15px] font-semibold ${
            filled
              ? 'bg-bb-yellow hover:bg-bb-yellowDark text-bb-textDark cursor-pointer'
              : 'bg-bb-yellow/60 text-bb-textDark/60 cursor-not-allowed'
          }`}
        >
          Start Test
        </button>

        <div className="flex-1" />
        <p className="text-[14px] text-bb-textDark mt-20">
          You can <a className="text-bb-blue underline">review the instructions</a> that the proctor reads aloud.
        </p>
      </div>
    </div>
  );
}
