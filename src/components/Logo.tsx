type LogoProps = {
  variant?: "light" | "dark";
  compact?: boolean;
};

export function Logo({ variant = "light", compact = false }: LogoProps) {
  const src = variant === "dark" ? "/logo-dark.png" : "/logo-light.png";

  return (
    <span className={`logo logo-img ${compact ? "logo-compact" : ""}`}>
      <img src={src} alt="GrowNXT.co" />
    </span>
  );
}
