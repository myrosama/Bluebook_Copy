import { useState, useCallback, useEffect } from 'react';
import { test } from './data/test.js';
import SecurityPledge from './screens/SecurityPledge.jsx';
import StartCode from './screens/StartCode.jsx';
import TestInterface from './screens/TestInterface.jsx';
import ModuleOver from './screens/ModuleOver.jsx';
import Break from './screens/Break.jsx';
import Upload from './screens/Upload.jsx';
import Congratulations from './screens/Congratulations.jsx';

const SCREENS = {
  SECURITY: 'security',
  START_CODE: 'startCode',
  TEST: 'test',
  MODULE_OVER: 'moduleOver',
  BREAK: 'break',
  UPLOAD: 'upload',
  CONGRATS: 'congrats',
};

export default function App() {
  const [screen, setScreen] = useState(SCREENS.SECURITY);
  const [studentName, setStudentName] = useState('Boboxon Yusupov');
  const [moduleIndex, setModuleIndex] = useState(0);
  // answers: { [moduleIndex]: { [questionIndex]: { value, marked } } }
  const [answers, setAnswers] = useState({});

  const setAnswer = useCallback((mIdx, qIdx, value) => {
    setAnswers((prev) => {
      const m = { ...(prev[mIdx] || {}) };
      const q = { ...(m[qIdx] || {}) };
      q.value = value;
      m[qIdx] = q;
      return { ...prev, [mIdx]: m };
    });
  }, []);

  const toggleMark = useCallback((mIdx, qIdx) => {
    setAnswers((prev) => {
      const m = { ...(prev[mIdx] || {}) };
      const q = { ...(m[qIdx] || {}) };
      q.marked = !q.marked;
      m[qIdx] = q;
      return { ...prev, [mIdx]: m };
    });
  }, []);

  const setStrikethrough = useCallback((mIdx, qIdx, choiceIdx, on) => {
    setAnswers((prev) => {
      const m = { ...(prev[mIdx] || {}) };
      const q = { ...(m[qIdx] || {}) };
      const strikes = new Set(q.strikes || []);
      if (on) strikes.add(choiceIdx);
      else strikes.delete(choiceIdx);
      q.strikes = [...strikes];
      m[qIdx] = q;
      return { ...prev, [mIdx]: m };
    });
  }, []);

  const finishModule = useCallback(() => {
    setScreen(SCREENS.MODULE_OVER);
  }, []);

  // Auto-advance from Module Over screen after 3 seconds
  useEffect(() => {
    if (screen !== SCREENS.MODULE_OVER) return;
    const t = setTimeout(() => {
      const next = moduleIndex + 1;
      if (next >= test.modules.length) {
        setScreen(SCREENS.UPLOAD);
        return;
      }
      const justFinishedEbrw =
        test.modules[moduleIndex].type === 'ebrw' &&
        test.modules[next].type === 'math';
      if (justFinishedEbrw) {
        setModuleIndex(next);
        setScreen(SCREENS.BREAK);
      } else {
        setModuleIndex(next);
        setScreen(SCREENS.TEST);
      }
    }, 3000);
    return () => clearTimeout(t);
  }, [screen, moduleIndex]);

  useEffect(() => {
    if (screen !== SCREENS.UPLOAD) return;
    const t = setTimeout(() => setScreen(SCREENS.CONGRATS), 5000);
    return () => clearTimeout(t);
  }, [screen]);

  if (screen === SCREENS.SECURITY) {
    return (
      <SecurityPledge
        onContinue={(name) => {
          setStudentName(name || 'Boboxon Yusupov');
          setScreen(SCREENS.START_CODE);
        }}
      />
    );
  }

  if (screen === SCREENS.START_CODE) {
    return <StartCode onStart={() => setScreen(SCREENS.TEST)} />;
  }

  if (screen === SCREENS.TEST) {
    return (
      <TestInterface
        moduleIndex={moduleIndex}
        module={test.modules[moduleIndex]}
        studentName={studentName}
        moduleAnswers={answers[moduleIndex] || {}}
        onAnswer={(qIdx, value) => setAnswer(moduleIndex, qIdx, value)}
        onToggleMark={(qIdx) => toggleMark(moduleIndex, qIdx)}
        onStrikethrough={(qIdx, cIdx, on) =>
          setStrikethrough(moduleIndex, qIdx, cIdx, on)
        }
        onFinish={finishModule}
      />
    );
  }

  if (screen === SCREENS.MODULE_OVER) {
    return <ModuleOver />;
  }

  if (screen === SCREENS.BREAK) {
    return (
      <Break
        studentName={studentName}
        onResume={() => setScreen(SCREENS.TEST)}
      />
    );
  }

  if (screen === SCREENS.UPLOAD) {
    return <Upload />;
  }

  if (screen === SCREENS.CONGRATS) {
    return <Congratulations />;
  }

  return null;
}
