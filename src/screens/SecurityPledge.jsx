import { useState, useMemo } from 'react';

const PLEDGE_TEXT =
  'I am the person who is supposed to take this exam. I agree to follow the rules above and understand what will happen if I break them.';

export default function SecurityPledge({ onContinue }) {
  const [pledge, setPledge] = useState(PLEDGE_TEXT);
  const [retype, setRetype] = useState('');
  const [name, setName] = useState('');

  const valid = useMemo(
    () => pledge.trim().length > 0 && retype.trim() === pledge.trim(),
    [pledge, retype]
  );

  return (
    <div className="min-h-screen flex flex-col bg-bb-pageBg">
      {/* Top thin header */}
      <div className="h-12 bg-white border-b border-bb-border flex items-center justify-between px-6 text-[14px]">
        <button className="flex items-center gap-2 text-bb-textDark hover:underline">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-bb-textDark text-[12px]">
            ?
          </span>
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

      <div className="flex-1 max-w-[920px] w-full mx-auto px-6 pt-8 pb-24">
        <h1 className="text-center text-[26px] font-medium text-bb-textDark mb-6">
          Digital Test Security
        </h1>

        <p className="text-[15px] font-semibold text-bb-textDark mb-3">
          You're bound by the following rules for today's exam:
        </p>
        <ul className="list-disc pl-6 space-y-3 text-[14px] text-bb-textDark mb-8">
          <li>You may not give or receive help during the exam. You may not share or post anything related to this exam.</li>
          <li>Your answers must be entirely your own. College Board will review your responses.</li>
          <li>You may not use any other applications, programs, or websites (except for approved assistive technology). If College Board detects any applications running while you are testing, your scores may be canceled.</li>
          <li>If you attempt to cheat, your score will be canceled, college admissions offices may be notified, and you will be disqualified from taking any AP Exams, SAT or PSAT assessments, or CLEP exams.</li>
        </ul>

        <div className="grid grid-cols-2 gap-8 mt-2">
          <div>
            <label className="block text-[14px] font-semibold text-bb-textDark mb-2">
              Test Security Pledge
            </label>
            <p className="text-[14px] text-bb-textDark leading-relaxed">{PLEDGE_TEXT}</p>
          </div>
          <div>
            <label className="block text-[14px] font-semibold text-bb-textDark mb-2">
              Retype the Test Security Pledge:
            </label>
            <textarea
              value={retype}
              onChange={(e) => setRetype(e.target.value)}
              className="w-full h-[110px] border-2 border-bb-blue rounded-md p-3 text-[14px] outline-none resize-none"
            />
          </div>
        </div>

        <div className="mt-8">
          <label className="block text-[14px] font-semibold text-bb-textDark mb-2">
            Your name (for footer display):
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Boboxon Yusupov"
            className="w-[300px] border border-bb-border rounded-md px-3 py-2 text-[14px] outline-none focus:border-bb-blue"
          />
        </div>
      </div>

      {/* Footer with progress */}
      <div className="fixed bottom-0 left-0 right-0 h-[64px] bg-white border-t border-bb-border flex items-center justify-between px-8">
        <button className="px-5 py-2 text-[14px] rounded-full border border-bb-textDark hover:bg-gray-100">
          Back
        </button>
        <div className="flex-1 mx-8">
          <div className="text-center text-[12px] text-bb-textDark mb-1">Step 6 of 9</div>
          <div className="h-[5px] bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-bb-blue" style={{ width: `${(6 / 9) * 100}%` }} />
          </div>
        </div>
        <button
          disabled={!valid}
          onClick={() => valid && onContinue(name)}
          className={`px-6 py-2 text-[14px] rounded-full border ${
            valid
              ? 'border-bb-textDark text-bb-textDark hover:bg-gray-100 cursor-pointer'
              : 'border-bb-border text-bb-gray cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
