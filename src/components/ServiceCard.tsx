import ServiceIcon from "@/components/ServiceIcon";
import type { Service } from "@/types";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="flex h-full flex-col border border-nuit-900/12 bg-papier-50 p-6 transition-colors hover:border-nuit-900/40">
      <span className="flex h-11 w-11 items-center justify-center border border-flamme-600/25 bg-flamme-100 text-flamme-700">
        <ServiceIcon name={service.icon} className="h-6 w-6" />
      </span>
      <h3 className="titre-scene mt-5 text-xl text-nuit-950">{service.name}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-acier-600">
        {service.description}
      </p>
      {service.price ? (
        <p className="mt-5 border-t border-nuit-900/12 pt-4 text-sm font-semibold text-flamme-600">
          {service.price}
        </p>
      ) : null}
    </article>
  );
}
