import Image from "next/image";
import { plancheAtelier } from "@/lib/photos";

/**
 * Planche contact : quatre plans de l'atelier collés bord à bord juste sous le
 * générique défilant, légendés en monospace comme les vignettes d'une feuille
 * de tournage. Elle sert de respiration photographique entre l'ouverture et le
 * catalogue, et donne tout de suite à voir le vrai travail du garage.
 */
export default function PlancheAtelier() {
  return (
    <section
      aria-label="L'atelier en images"
      className="border-b border-nuit-800 bg-nuit-950"
    >
      <ul className="grid grid-cols-2 gap-px bg-nuit-800 lg:grid-cols-4">
        {plancheAtelier.map((photo) => (
          <li key={photo.legende} className="group bg-nuit-950">
            <figure>
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover grayscale-[0.35] transition duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                />
                {/* Même vignettage que les autres plans du site. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 vignettage"
                />
              </div>
              <figcaption className="repere-scene flex items-center gap-3 px-4 py-4 text-white/55">
                <span aria-hidden="true" className="text-flamme-500">
                  ▪
                </span>
                {photo.legende}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
