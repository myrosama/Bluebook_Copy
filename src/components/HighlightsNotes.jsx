export default function HighlightsNotes({ onClose }) {
  return (
    <div className="fixed top-[78px] right-4 z-30 w-[320px] bg-white border border-bb-border rounded-md shadow-popover">
      <div className="flex items-center justify-between px-4 py-3 border-b border-bb-border">
        <h3 className="text-[15px] font-semibold">Highlights & Notes</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>
      </div>
      <div className="p-4 text-[13px] text-bb-textDark">
        Select text in the passage to highlight it. Right-click a highlight to add a note.
      </div>
    </div>
  );
}
