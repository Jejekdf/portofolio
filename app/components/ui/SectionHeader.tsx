interface SectionHeaderProps {
  badge: string;
  count?: string;
  title: string;
  description: string;
  className?: string;
}

export function SectionHeader({
  badge,
  count,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`border-b border-[#1e2a20] pb-4 mb-10 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-xs text-[#c5a880] font-semibold tracking-[0.25em] uppercase">
          {badge}
        </span>
        {count && (
          <span className="font-mono text-xs sm:text-sm text-[#c5a880] tracking-widest uppercase shrink-0 whitespace-nowrap">
            {count}
          </span>
        )}
      </div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-[#f4f1eb] mt-2 text-balance">
        {title}
      </h2>
      <p className="font-mono text-xs sm:text-sm text-[#9e988f] mt-1">
        {description}
      </p>
    </div>
  );
}
