import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import { fullAddress, garageInfo } from "@/lib/garageInfo";

export const metadata: Metadata = {
  title: "Contact et accès",
  description: `Contacter le Garage Concept — ${fullAddress}. Téléphone, e-mail, horaires d'ouverture et plan d'accès.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-nuit-900 sm:text-4xl">
          Contact &amp; accès
        </h1>
        <p className="mt-3 text-base leading-relaxed text-acier-600">
          L&apos;atelier {garageInfo.name} vous accueille à{" "}
          {garageInfo.address.city}. Appelez-nous pour un rendez-vous, un devis
          ou une estimation de reprise.
        </p>
      </header>

      <div className="mt-10">
        <ContactSection />
      </div>
    </div>
  );
}
