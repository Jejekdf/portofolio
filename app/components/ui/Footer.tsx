export function Footer() {
  return (
    <footer className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 pt-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] border-t border-[#1e2a20]/60 mt-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-mono text-[11px] text-[#9e988f]/60 tracking-wider">
          &copy; {new Date().getFullYear()} RM • Fullstack Software Engineer
        </p>
        <p className="font-mono text-[11px] text-[#9e988f]/40 tracking-wider">
          Built with Next.js 16 &amp; Three.js
        </p>
      </div>
    </footer>
  );
}
