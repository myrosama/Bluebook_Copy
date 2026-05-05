import { BlockMath, InlineMath } from 'react-katex';

export default function ReferenceSheet({ onClose }) {
  return (
    <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-md shadow-modal w-[820px] max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-bb-border px-5 py-3">
          <h3 className="text-[16px] font-semibold">Reference</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6l-12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto thin-scroll p-6 grid grid-cols-3 gap-6 font-question text-[14px]">
          <Cell label="Circle area"><BlockMath math="A = \pi r^2" /></Cell>
          <Cell label="Circle circumference"><BlockMath math="C = 2\pi r" /></Cell>
          <Cell label="Rectangle area"><BlockMath math="A = \ell w" /></Cell>
          <Cell label="Triangle area"><BlockMath math="A = \tfrac{1}{2} b h" /></Cell>
          <Cell label="Pythagorean theorem"><BlockMath math="a^2 + b^2 = c^2" /></Cell>
          <Cell label="Special right 30-60-90"><BlockMath math="x : x\sqrt{3} : 2x" /></Cell>
          <Cell label="Special right 45-45-90"><BlockMath math="x : x : x\sqrt{2}" /></Cell>
          <Cell label="Rectangular solid volume"><BlockMath math="V = \ell w h" /></Cell>
          <Cell label="Cylinder volume"><BlockMath math="V = \pi r^2 h" /></Cell>
          <Cell label="Sphere volume"><BlockMath math="V = \tfrac{4}{3}\pi r^3" /></Cell>
          <Cell label="Cone volume"><BlockMath math="V = \tfrac{1}{3}\pi r^2 h" /></Cell>
          <Cell label="Pyramid volume"><BlockMath math="V = \tfrac{1}{3} \ell w h" /></Cell>
        </div>

        <div className="border-t border-bb-border p-3 text-[12px] text-bb-gray text-center">
          The number of degrees of arc in a circle is <InlineMath math="360" />. The sum of the measures in degrees of the angles of a triangle is <InlineMath math="180" />.
        </div>
      </div>
    </div>
  );
}

function Cell({ label, children }) {
  return (
    <div className="border border-bb-border rounded-md p-3 flex flex-col items-center justify-center text-center min-h-[88px]">
      <div className="text-[11px] uppercase tracking-wide text-bb-gray mb-1">{label}</div>
      <div>{children}</div>
    </div>
  );
}
