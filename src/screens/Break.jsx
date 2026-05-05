import { useState, useEffect } from 'react';

export default function Break({ studentName, onResume }) {
  const [seconds, setSeconds] = useState(10 * 60);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const m = Math.floor(seconds / 60);
  const s = seconds % 60;

  return (
    <div className="min-h-screen bg-bb-breakBg text-white relative">
      <div className="absolute top-3 right-4 flex items-center gap-1 text-[11px] text-white">
        <span>100%</span>
        <span className="battery" style={{ borderColor: 'white' }}>
          <span className="battery-fill" style={{ background: 'white' }} />
        </span>
      </div>

      <div className="max-w-[1100px] mx-auto pt-24 px-8 grid grid-cols-2 gap-12">
        <div className="flex flex-col items-center">
          <div className="border border-white/80 rounded-md px-12 py-8 text-center">
            <div className="text-[18px] font-semibold mb-2">Remaining Break Time:</div>
            <div className="text-[80px] font-bold leading-none tabular-nums">
              {m}:{s.toString().padStart(2, '0')}
            </div>
          </div>
          <button
            onClick={onResume}
            className="mt-8 px-8 py-3 rounded-full bg-bb-yellow hover:bg-bb-yellowDark text-bb-textDark font-semibold text-[15px]"
          >
            Resume Testing
          </button>
        </div>

        <div className="font-sans">
          <h1 className="text-[28px] font-semibold mb-3">Practice Test Break</h1>
          <p className="text-[14px] mb-4 leading-relaxed">
            You can resume this practice test as soon as you're ready to move on. On test day, you'll wait until
            the clock counts down. Read below to see how breaks work on test day.
          </p>
          <hr className="border-white/20 mb-4" />
          <h2 className="text-[22px] font-semibold mb-3">Take a Break: Do Not Close Your Device</h2>
          <p className="text-[14px] mb-4 leading-relaxed">
            After the break, a <b>Resume Testing Now</b> button will appear and you'll start the next section.
          </p>
          <p className="text-[14px] font-semibold mb-2">Follow these rules during the break:</p>
          <ol className="list-decimal pl-6 space-y-2 text-[14px] leading-relaxed">
            <li>Do not disturb students who are still testing.</li>
            <li>Do not exit the app or close your laptop.</li>
            <li>Do not access phones, smartwatches, textbooks, notes, or the internet.</li>
            <li>Do not eat or drink near any testing device.</li>
            <li>Do not speak in the testing room; outside the room, do not discuss the exam with anyone.</li>
          </ol>
        </div>
      </div>

      <div className="absolute bottom-4 left-8 text-[14px] font-semibold">{studentName}</div>
    </div>
  );
}
