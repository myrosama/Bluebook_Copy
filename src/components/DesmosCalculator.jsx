import { useEffect, useRef, useState } from 'react';

export default function DesmosCalculator({ onClose }) {
  const calcRef = useRef(null);
  const [pos, setPos] = useState({ x: 80, y: 90 });
  const [size, setSize] = useState({ w: 320, h: 540 });
  const [tab, setTab] = useState('graphing');
  const [expanded, setExpanded] = useState(false);
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, ox: 0, oy: 0 });
  const desmosInstance = useRef(null);

  useEffect(() => {
    if (!calcRef.current) return;
    if (!window.Desmos) return;
    if (desmosInstance.current) {
      desmosInstance.current.destroy();
    }
    if (tab === 'graphing') {
      desmosInstance.current = window.Desmos.GraphingCalculator(calcRef.current, {
        keypad: true,
        expressions: true,
        settingsMenu: true,
      });
    } else {
      desmosInstance.current = window.Desmos.ScientificCalculator(calcRef.current);
    }
    return () => {
      desmosInstance.current?.destroy();
      desmosInstance.current = null;
    };
  }, [tab, expanded]);

  useEffect(() => {
    const move = (e) => {
      if (!dragRef.current.dragging) return;
      setPos({
        x: dragRef.current.ox + (e.clientX - dragRef.current.startX),
        y: Math.max(50, dragRef.current.oy + (e.clientY - dragRef.current.startY)),
      });
    };
    const up = () => (dragRef.current.dragging = false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
  }, []);

  const onDragStart = (e) => {
    dragRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      ox: pos.x,
      oy: pos.y,
    };
  };

  const w = expanded ? 760 : size.w;
  const h = expanded ? 600 : size.h;

  return (
    <div
      style={{ left: pos.x, top: pos.y, width: w, height: h }}
      className="fixed bg-white rounded-md shadow-modal border border-bb-border z-40 flex flex-col select-none"
    >
      <div
        onMouseDown={onDragStart}
        className="h-9 bg-white border-b border-bb-border flex items-center px-2 cursor-move rounded-t-md"
      >
        <div className="flex items-center bg-gray-100 rounded p-[2px]">
          <button
            onClick={() => setTab('graphing')}
            className={`flex items-center gap-1 px-2 py-1 text-[12px] rounded ${
              tab === 'graphing' ? 'bg-white shadow text-bb-textDark' : 'text-gray-600'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 18c4-8 8-8 12-2s6-2 6-2" />
            </svg>
            <span className={tab === 'graphing' ? 'underline' : ''}>Graphing</span>
          </button>
          <button
            onClick={() => setTab('scientific')}
            className={`flex items-center gap-1 px-2 py-1 text-[12px] rounded ${
              tab === 'scientific' ? 'bg-white shadow text-bb-textDark' : 'text-gray-600'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="5" y="3" width="14" height="18" rx="1" />
              <rect x="7" y="6" width="10" height="3" />
            </svg>
            <span className={tab === 'scientific' ? 'underline' : ''}>Scientific</span>
          </button>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="grid grid-cols-3 gap-[2px] w-3 h-3 opacity-50">
            <div className="bg-bb-textDark rounded-full" />
            <div className="bg-bb-textDark rounded-full" />
            <div className="bg-bb-textDark rounded-full" />
            <div className="bg-bb-textDark rounded-full" />
            <div className="bg-bb-textDark rounded-full" />
            <div className="bg-bb-textDark rounded-full" />
          </div>
        </div>

        <button
          onClick={() => setExpanded((v) => !v)}
          title="Expand"
          className="p-1 text-bb-textDark hover:bg-gray-100 rounded"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9V3h6M21 15v6h-6M21 9V3h-6M3 15v6h6" />
          </svg>
        </button>
        <button onClick={onClose} className="p-1 text-bb-textDark hover:bg-gray-100 rounded ml-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>
      </div>

      <div ref={calcRef} className="flex-1 min-h-0" />
    </div>
  );
}
