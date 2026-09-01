export function CanvasFallback() {
  return (
    <div
      aria-hidden="true"
      className="w-full h-full bg-[#090d0a] flex items-center justify-center"
    >
      <span className="font-mono text-2xs text-[#1e2a20] tracking-widest uppercase">
        Loading...
      </span>
    </div>
  );
}
