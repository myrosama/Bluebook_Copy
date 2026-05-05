export default function ModuleOver() {
  return (
    <div className="min-h-screen bg-bb-pageBg flex flex-col items-center justify-center font-sans">
      <h1 className="text-[28px] text-bb-blue mb-6">This Module Is Over</h1>
      <p className="text-[15px] text-bb-textDark mb-1">All your work has been saved.</p>
      <p className="text-[15px] text-bb-textDark mb-1">You'll move on automatically in just a moment.</p>
      <p className="text-[15px] text-bb-textDark mb-8">Do not refresh this page or quit the app.</p>
      <div className="dot-loader">
        <span /><span /><span />
      </div>
    </div>
  );
}
