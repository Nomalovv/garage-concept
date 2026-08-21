import ServiceIcon from "@/components/ServiceIcon";
import type { Service } from "@/types";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-nuit-100 bg-white p-6 shadow-sm transition hover:border-nuit-200 hover:shadow-md">
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-flamme-100 text-flamme-700">
        <ServiceIcon name={service.icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-nuit-900">
        {service.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-acier-600">
        {service.description}
      </p>
      {service.price ? (
        <p className="mt-4 text-sm font-semibold text-flamme-600">
          {service.price}
        </p>
      ) : null}
    </article>
  );
}
