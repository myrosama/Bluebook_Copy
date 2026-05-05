export default function QuestionNavModal({ module, current, moduleAnswers, onClose, onJump }) {
  const total = module.questions.length;

  return (
    <div className="absolute bottom-[64px] left-1/2 -translate-x-1/2 z-30">
      <div className="relative">
        <div className="bg-white rounded-md shadow-modal border border-bb-border w-[470px]">
          <div className="px-5 pt-4 pb-3 relative">
            <h3 className="text-center text-[15px] font-semibold text-bb-textDark leading-snug pr-6">
              {module.sectionLabel}
              <br />
              Questions
            </h3>
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-6 h-6 inline-flex items-center justify-center text-bb-textDark hover:bg-gray-100 rounded"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6l-12 12" />
              </svg>
            </button>
          </div>

          <div className="border-t border-b border-bb-border px-5 py-2 flex justify-around text-[13px] text-bb-textDark">
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7Z" />
              </svg>
              Current
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 border border-dashed border-bb-textDark rounded-sm" />
              Unanswered
            </div>
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#c62828">
                <path d="M6 3h12v18l-6-4-6 4z" />
              </svg>
              For Review
            </div>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-10 gap-y-4 gap-x-2">
              {Array.from({ length: total }).map((_, i) => {
                const ans = moduleAnswers[i] || {};
                const answered = ans.value !== undefined && ans.value !== null && ans.value !== '';
                const isCurrent = i === current;
                const marked = ans.marked;

                return (
                  <div key={i} className="relative flex flex-col items-center">
                    {isCurrent && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-bb-blue mb-[2px]">
                        <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7Z" />
                      </svg>
                    )}
                    <button
                      onClick={() => onJump(i)}
                      className={`relative w-9 h-7 rounded-sm text-[13px] font-semibold inline-flex items-center justify-center ${
                        isCurrent
                          ? 'bg-bb-blue text-white'
                          : answered
                          ? 'bg-bb-blue text-white'
                          : 'border border-dashed border-bb-blue text-bb-blue bg-white'
                      }`}
                    >
                      {i + 1}
                      {marked && (
                        <svg width="9" height="11" viewBox="0 0 24 24" fill="#c62828" className="absolute -top-[6px] -right-[5px]">
                          <path d="M6 3h12v18l-6-4-6 4z" />
                        </svg>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-bb-border p-4 flex justify-center">
            <button className="px-5 py-2 rounded-full border border-bb-textDark text-[13px] text-bb-textDark hover:bg-gray-50">
              Go to Review Page
            </button>
          </div>
        </div>
        {/* Tail pointing down */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-[8px] w-4 h-4 bg-white border-r border-b border-bb-border rotate-45" />
      </div>
    </div>
  );
}
