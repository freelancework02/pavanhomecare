export default function BackgroundShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <div className="absolute inset-x-0 top-0 h-[58%] bg-[linear-gradient(180deg,#F5F9FF_0%,rgba(255,255,255,0)_100%)]" />
      <div className="absolute inset-0 opacity-[0.38] [background-image:linear-gradient(rgba(0,97,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(0,97,255,0.07)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute left-0 right-0 top-[120px] h-px bg-gradient-to-r from-transparent via-[#0061FF]/20 to-transparent" />
    </div>
  );
}
