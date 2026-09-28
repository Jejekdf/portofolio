export function Footer() {
  return (
    <footer className="w-full px-5 sm:px-8 md:px-12 lg:px-16 2xl:px-24 pt-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] border-t border-[#1e2a20]/60 mt-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-mono text-xs text-[#9e988f]/60 tracking-wider">
          &copy; {new Date().getFullYear()} Randi Maulana
        </p>
        <p className="font-mono text-xs text-[#9e988f]/40 tracking-wider">
          Next.js 16 &amp; Three.js
        </p>
      </div>
    </footer>
  );
}
