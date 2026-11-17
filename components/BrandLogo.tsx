import Link from "next/link";

interface BrandLogoProps {
  size?: "sm" | "md";
  showSubtitle?: boolean;
}

export function BrandLogo({ size = "md", showSubtitle = false }: BrandLogoProps) {
  const iconSize = size === "sm" ? 32 : 38;

  return (
    <Link
      href="#home"
      className="group inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-emerald)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-canvas)]"
      aria-label="Savindu Shiranjaya Warnakulasooriya — Back to top"
    >
      <span
        className="relative flex shrink-0 items-center justify-center transition-transform duration-200 group-hover:scale-[1.03]"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden="true"
          className="block h-full w-full"
        >
          <rect width="64" height="64" rx="16" fill="#FFFFFF" />
          <rect
            x="0.75"
            y="0.75"
            width="62.5"
            height="62.5"
            rx="15.25"
            stroke="rgba(13,18,22,0.14)"
            strokeWidth="1.5"
          />
          <path
            d="M35 14H45A4 4 0 0 1 49 18A4 4 0 0 1 45 22H35V14Z"
            fill="#FFD900"
          />
          <path
            d="M35 14H26A11 11 0 0 0 26 36H38A3 3 0 0 1 38 42H29V50H38A11 11 0 0 0 38 28H26A3 3 0 0 1 26 22H35V14Z"
            fill="#09B57B"
          />
          <path
            d="M19 42H29V50H19A4 4 0 0 1 15 46A4 4 0 0 1 19 42Z"
            fill="#FF5C5D"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[16px] font-bold tracking-[-0.02em] text-[var(--text-primary)]">
          Savindu
        </span>
        {showSubtitle ? (
          <span className="mt-1 font-mono text-[11px] font-medium tracking-wide text-[var(--text-secondary)]">
            Software Engineer
          </span>
        ) : null}
      </span>
    </Link>
  );
}
