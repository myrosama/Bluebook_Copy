export default function DirectionsModal({ type, onClose }) {
  return (
    <div className="absolute left-6 top-[78px] z-30">
      <div className="relative">
        {/* Tail */}
        <div className="absolute -top-[8px] left-[40px] w-4 h-4 bg-white border-t border-l border-bb-border rotate-45" />
        <div className="bg-white rounded-md shadow-modal border border-bb-border w-[820px] max-h-[460px] flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto thin-scroll p-7 font-question text-[15px]">
            {type === 'ebrw' ? <EBRWDirections /> : <MathDirections />}
          </div>
          <div className="flex justify-end p-4">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full bg-bb-yellow hover:bg-bb-yellowDark text-bb-textDark font-semibold text-[14px]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EBRWDirections() {
  return (
    <div className="space-y-3">
      <p>
        The questions in this section address a number of important reading and writing skills. Each question
        includes one or more passages, which may include a table or graph. Read each passage and question
        carefully, and then choose the best answer to the question based on the passage(s).
      </p>
      <p>
        All questions in this section are multiple-choice with four answer choices. Each question has a single
        best answer.
      </p>
    </div>
  );
}

function MathDirections() {
  return (
    <div className="space-y-3">
      <p>The questions in this section address a number of important math skills.</p>
      <p>
        Use of a calculator is permitted for all questions. A reference sheet, calculator, and these directions
        can be accessed throughout the test.
      </p>
      <p className="font-semibold">Unless otherwise indicated:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>All variables and expressions represent real numbers.</li>
        <li>Figures provided are drawn to scale.</li>
        <li>All figures lie in a plane.</li>
        <li>The domain of a given function f is the set of all real numbers x for which f(x) is a real number.</li>
      </ul>
      <p>
        For <b>multiple-choice questions</b>, solve each problem and choose the correct answer from the choices
        provided. Each multiple-choice question has a single correct answer.
      </p>
      <p>
        For <b>student-produced response questions</b>, solve each problem and enter your answer as described
        below.
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>If you find <b>more than one correct answer</b>, enter only one answer.</li>
        <li>You can enter up to 5 characters for a <b>positive</b> answer and up to 6 characters (including the negative sign) for a <b>negative</b> answer.</li>
        <li>If your answer is a <b>fraction</b> that doesn't fit in the provided space, enter the decimal equivalent.</li>
        <li>If your answer is a <b>decimal</b> that doesn't fit in the provided space, enter it by truncating or rounding at the fourth digit.</li>
        <li>If your answer is a <b>mixed number</b> (such as 3 1/2), enter it as an improper fraction (7/2) or its decimal equivalent (3.5).</li>
        <li>Don't enter <b>symbols</b> such as a percent sign, comma, or dollar sign.</li>
      </ul>
    </div>
  );
}
