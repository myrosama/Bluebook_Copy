import { useState } from 'react';
import QuestionNavModal from './QuestionNavModal.jsx';

export default function TestFooter({
  studentName,
  current,
  total,
  isLast,
  canBack,
  onBack,
  onNext,
  module,
  moduleAnswers,
  onJump,
}) {
  const [showNav, setShowNav] = useState(false);

  return (
    <>
    {/* Dashed divider line above the footer */}
    <div
      className="h-[2px]"
      style={{
        backgroundImage:
          'repeating-linear-gradient(to right, #000 0px, #000 23px, #fff 23px, #fff 25px)',
      }}
    />
    <footer className="relative h-[50px] bg-bb-headerBg flex items-center px-8">
      <div className="text-[14px] font-semibold text-bb-textDark">{studentName}</div>

      <div className="flex-1 flex justify-center relative">
        <button
          onClick={() => setShowNav((v) => !v)}
          className="bg-bb-textDark text-white text-[14px] px-4 py-[6px] rounded-md inline-flex items-center gap-2"
        >
          Question {current + 1} of {total}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d={showNav ? 'm6 15 6-6 6 6' : 'm6 9 6 6 6-6'} />
          </svg>
        </button>

        {showNav && (
          <QuestionNavModal
            module={module}
            current={current}
            moduleAnswers={moduleAnswers}
            onClose={() => setShowNav(false)}
            onJump={(idx) => {
              onJump(idx);
              setShowNav(false);
            }}
          />
        )}
      </div>

      <div className="flex gap-3">
        {canBack && (
          <button
            onClick={onBack}
            className="px-6 py-2 text-[14px] rounded-full bg-bb-blue text-white hover:bg-bb-blueLight"
          >
            Back
          </button>
        )}
        <button
          onClick={onNext}
          className="px-7 py-2 text-[14px] rounded-full bg-bb-blue text-white hover:bg-bb-blueLight font-semibold"
        >
          {isLast ? 'Save' : 'Next'}
        </button>
      </div>
    </footer>
    </>
  );
}
