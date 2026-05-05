import { useState } from 'react';

const OPTIONS = ['Excellent', 'Good', 'Fair', 'Poor'];

export default function RateModal({ onClose }) {
  const [rating, setRating] = useState(null);
  const [feedback, setFeedback] = useState('');
  const canSubmit = rating !== null;

  return (
    <div className="fixed inset-0 z-40 bg-black/55 flex items-center justify-center px-6">
      <div className="bg-white rounded-md shadow-modal w-[560px] p-7 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-bb-blue hover:opacity-70">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>

        <h2 className="text-center text-[18px] font-bold text-bb-textDark mb-6 leading-snug">
          Overall, how would you rate your<br />experience taking a test?
        </h2>

        <div className="space-y-2 mb-6">
          {OPTIONS.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100"
            >
              <input
                type="radio"
                name="rating"
                checked={rating === opt}
                onChange={() => setRating(opt)}
                className="w-4 h-4 accent-bb-blue"
              />
              <span className="text-[14px] text-bb-textDark">{opt}</span>
            </label>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-[14px] font-semibold text-bb-textDark mb-2">
            What went well? What can we improve?
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full h-[110px] border border-bb-border rounded-md p-3 text-[14px] outline-none focus:border-bb-blue resize-none"
          />
        </div>

        <div className="flex justify-end items-center gap-5">
          <button onClick={onClose} className="text-bb-blue text-[14px] font-semibold hover:underline">
            Dismiss
          </button>
          <button
            disabled={!canSubmit}
            onClick={onClose}
            className={`px-6 py-2 rounded-full text-[14px] font-semibold ${
              canSubmit
                ? 'bg-bb-blue text-white hover:bg-bb-blueLight'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
