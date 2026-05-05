import { useState, useMemo } from 'react';

const PLEDGE_TEXT =
  'I am the person who is supposed to take this exam. I agree to follow the rules above and understand what will happen if I break them.';

export default function SecurityPledge({ onContinue }) {
  const [retype, setRetype] = useState('');

  const valid = useMemo(
    () => retype.trim() === PLEDGE_TEXT.trim(),
    [retype]
  );

  return (
    <div className="min-h-screen flex flex-col bg-bb-pageBg">
      {/* Header bar — full-width bg, container constrains content */}
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

      {/* Body — full-width bg, container constrains content */}
      <main className="flex-1 pb-[88px]">
        <div className="max-w-[1040px] mx-auto px-8 pt-10">
          <h1 className="text-center text-[28px] font-normal text-bb-textDark mb-8">
            Digital Test Security
          </h1>

          <div className="max-w-[640px] mx-auto">
            <p className="text-[15px] font-bold text-bb-textDark mb-3">
              You're bound by the following rules for today's exam:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-[14.5px] text-bb-textDark mb-10 leading-[1.55]">
              <li>You may not give or receive help during the exam. You may not share or post anything related to this exam.</li>
              <li>Your answers must be entirely your own. College Board will review your responses.</li>
              <li>You may not use any other applications, programs, or websites (except for approved assistive technology). If College Board detects any applications running while you are testing, your scores may be canceled.</li>
              <li>If you attempt to cheat, your score will be canceled, college admissions offices may be notified, and you will be disqualified from taking any AP Exams, SAT or PSAT assessments, or CLEP exams.</li>
            </ul>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h2 className="text-[14px] font-bold text-bb-textDark pb-1.5 mb-3 border-b border-gray-300">
                  Test Security Pledge
                </h2>
                <p className="text-[14px] text-bb-textDark leading-relaxed">
                  I am the person who is supposed to take this exam. I agree to follow the rules above and understand what will happen if I break<br />
                  them.
                </p>
              </div>
              <div>
                <h2 className="text-[14px] font-bold text-bb-textDark mb-3">
                  Retype the Test Security Pledge:
                </h2>
                <textarea
                  value={retype}
                  onChange={(e) => setRetype(e.target.value)}
                  className="w-full h-[140px] border-2 border-bb-blue rounded-md p-3 text-[14px] resize-none bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer — full-width bg, container constrains content */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-bb-border">
        <div className="max-w-[1040px] mx-auto h-[64px] px-8 flex items-center gap-6">
          <button className="px-6 py-[7px] text-[14px] font-medium rounded-full border border-bb-textDark text-bb-textDark hover:bg-gray-50">
            Back
          </button>
          <div className="flex-1">
            <div className="text-center text-[13px] text-bb-textDark mb-1.5">Step 6 of 9</div>
            <div className="h-[5px] bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-bb-blue" style={{ width: `${(6 / 9) * 100}%` }} />
            </div>
          </div>
          <button
            disabled={!valid}
            onClick={() => valid && onContinue('Boboxon Yusupov')}
            className={`px-7 py-[7px] text-[14px] font-medium rounded-full border transition-colors ${
              valid
                ? 'border-bb-textDark text-bb-textDark hover:bg-gray-50 cursor-pointer'
                : 'border-gray-300 text-gray-400 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
}
