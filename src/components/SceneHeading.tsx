import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

type SceneHeadingProps = {
  /** Numéro de scène affiché dans le repère (« SCÈNE 01 »). */
  number: string;
  /** Intitulé court de la scène, en capitales espacées. */
  label: string;
  title: ReactNode;
  description?: ReactNode;
  /** Lien ou bouton aligné à droite du titre. */
  action?: ReactNode;
  tone?: "clair" | "sombre";
};

/**
 * En-tête de section « script de film » : filet de séparation, repère de scène
 * numéroté en monospace, puis grand titre en serif éditoriale.
 */
export default function SceneHeading({
  number,
  label,
  title,
  description,
  action,
  tone = "clair",
}: SceneHeadingProps) {
  const isDark = tone === "sombre";

  return (
    <Reveal>
      <div
        className={`flex items-center gap-4 border-t pt-4 ${
          isDark ? "border-white/20" : "border-nuit-900/15"
        }`}
      >
        <span
          className={`repere-scene ${isDark ? "text-flamme-500" : "text-flamme-600"}`}
        >
          Scène {number}
        </span>
        <span
          aria-hidden="true"
          className={`h-px flex-1 ${isDark ? "bg-white/20" : "bg-nuit-900/15"}`}
        />
        <span
          className={`repere-scene ${isDark ? "text-white/50" : "text-acier-600"}`}
        >
          {label}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
        <div className="max-w-3xl">
          <h2
            className={`titre-scene text-[2.5rem] sm:text-6xl lg:text-7xl ${
              isDark ? "text-white" : "text-nuit-950"
            }`}
          >
            {title}
          </h2>
          {description ? (
            <p
              className={`mt-5 max-w-xl text-base leading-relaxed sm:text-lg ${
                isDark ? "text-nuit-200" : "text-acier-600"
              }`}
            >
              {description}
            </p>
          ) : null}
        </div>
        {action ? <div className="pb-2">{action}</div> : null}
      </div>
    </Reveal>
  );
}
