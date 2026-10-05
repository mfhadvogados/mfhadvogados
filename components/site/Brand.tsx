import lockup from "@/materialGraficoMFH/logotipos/logo-v1-preto@3x.png";
import monogramDark from "@/materialGraficoMFH/logotipos/logo-v2-preto@3x.png";
import monogramLight from "@/materialGraficoMFH/logotipos/logo-v2-branco@3x.png";
import { site } from "@/lib/site-content";

type BrandProps = {
  variant?: "lockup" | "monogram";
  tone?: "dark" | "light";
  className?: string;
  decorative?: boolean;
};

/** Displays the official artwork, cropping only its transparent canvas. */
export function Brand({
  variant = "lockup",
  tone = "dark",
  className = "",
  decorative = false,
}: BrandProps) {
  const artwork =
    variant === "lockup"
      ? lockup
      : tone === "light"
        ? monogramLight
        : monogramDark;
  const viewBox =
    variant === "lockup"
      ? "425 700 1571 387"
      : tone === "light"
        ? "960 818 608 137"
        : "959 818 608 137";

  return (
    <span
      className={`brand brand--${variant} brand--${tone} ${className}`.trim()}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : site.fullName}
      aria-hidden={decorative || undefined}
    >
      <svg
        viewBox={viewBox}
        width={variant === "lockup" ? 1571 : 608}
        height={variant === "lockup" ? 387 : 137}
        aria-hidden="true"
        focusable="false"
      >
        <image
          href={artwork.src}
          width={artwork.width}
          height={artwork.height}
        />
      </svg>
    </span>
  );
}
