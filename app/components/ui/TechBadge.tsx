interface TechBadgeProps {
  children: React.ReactNode;
  variant?: "muted" | "solid";
  size?: "sm" | "md";
  className?: string;
}

export function TechBadge({
  children,
  variant = "muted",
  size = "md",
  className = "",
}: TechBadgeProps) {
  const sizeStyles =
    size === "sm"
      ? "px-2.5 py-0.5 rounded text-xs"
      : "px-3 py-1 rounded-full text-xs";

  const variantStyles =
    variant === "solid"
      ? "bg-[#1e2a20]/40 text-[#f4f1eb] border-[#1e2a20] group-hover:border-[#c5a880]/30"
      : "bg-[#1e2a20]/30 text-[#9e988f] border-[#1e2a20] group-hover:border-[#c5a880]/30 group-hover:text-[#f4f1eb]";

  return (
    <span
      className={`inline-flex items-center font-mono border transition-colors duration-150 whitespace-nowrap ${sizeStyles} ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
}
