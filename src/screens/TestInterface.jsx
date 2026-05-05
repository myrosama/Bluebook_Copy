import { useEffect, useState } from 'react';
import TestHeader from '../components/TestHeader.jsx';
import TestFooter from '../components/TestFooter.jsx';
import EBRWQuestion from '../components/EBRWQuestion.jsx';
import MathQuestion from '../components/MathQuestion.jsx';
import DesmosCalculator from '../components/DesmosCalculator.jsx';
import ReferenceSheet from '../components/ReferenceSheet.jsx';
import HighlightsNotes from '../components/HighlightsNotes.jsx';

export default function TestInterface({
  moduleIndex,
  module,
  studentName,
  moduleAnswers,
  onAnswer,
  onToggleMark,
  onStrikethrough,
  onFinish,
}) {
  const [qIndex, setQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(module.timeSeconds);
  const [hidden, setHidden] = useState(false);
  const [showCalc, setShowCalc] = useState(false);
  const [showRef, setShowRef] = useState(false);
  const [showHL, setShowHL] = useState(false);

  useEffect(() => {
    setQIndex(0);
    setTimeLeft(module.timeSeconds);
    setShowCalc(false);
    setShowRef(false);
    setShowHL(false);
  }, [moduleIndex, module.timeSeconds]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish();
      return;
    }
    const t = setInterval(() => setTimeLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [timeLeft, onFinish]);

  const total = module.questions.length;
  const question = module.questions[qIndex];
  const answer = moduleAnswers[qIndex] || {};

  const handleNext = () => {
    if (qIndex < total - 1) setQIndex(qIndex + 1);
    else onFinish();
  };
  const handleBack = () => {
    if (qIndex > 0) setQIndex(qIndex - 1);
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <TestHeader
        module={module}
        timeLeft={timeLeft}
        hidden={hidden}
        setHidden={setHidden}
        onOpenCalculator={() => setShowCalc((v) => !v)}
        onOpenReference={() => setShowRef((v) => !v)}
        onOpenHighlights={() => setShowHL((v) => !v)}
      />

      <main className="flex-1 min-h-0 relative overflow-hidden bg-white">
        {module.type === 'ebrw' ? (
          <EBRWQuestion
            key={`${moduleIndex}-${qIndex}`}
            question={question}
            qIndex={qIndex}
            selected={answer.value}
            marked={!!answer.marked}
            strikes={answer.strikes}
            onSelect={(v) => onAnswer(qIndex, v)}
            onToggleMark={() => onToggleMark(qIndex)}
            onStrikethrough={(cIdx, on) => onStrikethrough(qIndex, cIdx, on)}
          />
        ) : (
          <MathQuestion
            key={`${moduleIndex}-${qIndex}`}
            question={question}
            qIndex={qIndex}
            selected={answer.value}
            marked={!!answer.marked}
            strikes={answer.strikes}
            onSelect={(v) => onAnswer(qIndex, v)}
            onToggleMark={() => onToggleMark(qIndex)}
            onStrikethrough={(cIdx, on) => onStrikethrough(qIndex, cIdx, on)}
          />
        )}

        {showCalc && <DesmosCalculator onClose={() => setShowCalc(false)} />}
        {showRef && <ReferenceSheet onClose={() => setShowRef(false)} />}
        {showHL && <HighlightsNotes onClose={() => setShowHL(false)} />}
      </main>

      <TestFooter
        studentName={studentName}
        current={qIndex}
        total={total}
        isLast={qIndex === total - 1}
        canBack={qIndex > 0}
        onBack={handleBack}
        onNext={handleNext}
        module={module}
        moduleAnswers={moduleAnswers}
        onJump={(i) => setQIndex(i)}
      />
    </div>
  );
}
