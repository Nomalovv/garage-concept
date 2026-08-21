import type { Metadata } from "next";
import type { ReactNode } from "react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { fullAddress, garageInfo } from "@/lib/garageInfo";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site ${garageInfo.name} : éditeur, hébergement, propriété intellectuelle et données personnelles.`,
};

/** Bloc filaire « feuille de tournage » : repère en mono puis contenu, comme
 * dans `ContactSection`/`CarDetail`. */
function Fiche({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-nuit-900/15 pt-5">
      <h2 className="repere-scene text-flamme-600">{label}</h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-acier-600">
        {children}
      </div>
    </div>
  );
}

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero
        slate="Séquence — Informations légales"
        eyebrow={`${garageInfo.name} — informations légales`}
        title="Mentions légales"
        description="Éditeur du site, hébergement, propriété intellectuelle et protection des données personnelles."
      />

      <section className="bg-papier-50">
        <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-10">
            <Reveal>
              <Fiche label="Éditeur du site">
                <p>
                  <strong className="text-nuit-950">{garageInfo.name}</strong>,{" "}
                  {garageInfo.legal.legalForm}
                  {garageInfo.legal.capitalSocial
                    ? ` au capital de ${garageInfo.legal.capitalSocial}`
                    : ""}
                  .
                </p>
                <p>{fullAddress}</p>
                <p>
                  SIRET : {garageInfo.siret} — RCS {garageInfo.legal.rcsCity}
                  {garageInfo.legal.vatNumber
                    ? ` — TVA intracommunautaire : ${garageInfo.legal.vatNumber}`
                    : ""}
                </p>
                <p>
                  Téléphone :{" "}
                  <a
                    href={`tel:${garageInfo.phone}`}
                    className="text-flamme-600 hover:text-flamme-700"
                  >
                    {garageInfo.phoneDisplay}
                  </a>{" "}
                  — E-mail :{" "}
                  <a
                    href={`mailto:${garageInfo.email}`}
                    className="text-flamme-600 hover:text-flamme-700"
                  >
                    {garageInfo.email}
                  </a>
                </p>
                <p>
                  Directeur de la publication : le gérant de {garageInfo.name}.
                </p>
              </Fiche>
            </Reveal>

            <Reveal delay={0.05}>
              <Fiche label="Hébergement">
                <p>
                  Le site est hébergé par{" "}
                  <strong className="text-nuit-950">GitHub, Inc.</strong>, 88
                  Colin P Kelly Jr Street, San Francisco, CA 94107,
                  États-Unis (
                  <a
                    href="https://github.com"
                    className="text-flamme-600 hover:text-flamme-700"
                  >
                    github.com
                  </a>
                  ).
                </p>
                <p>
                  Les données de l&apos;espace administrateur (véhicules,
                  prestations, authentification) sont hébergées par{" "}
                  <strong className="text-nuit-950">
                    Google Ireland Limited
                  </strong>{" "}
                  (Firebase / Google Cloud Platform), Gordon House, Barrow
                  Street, Dublin 4, Irlande.
                </p>
              </Fiche>
            </Reveal>

            <Reveal delay={0.1}>
              <Fiche label="Propriété intellectuelle">
                <p>
                  L&apos;ensemble des textes, logos et éléments graphiques de
                  ce site sont la propriété de {garageInfo.name} ou de leurs
                  auteurs respectifs. Toute reproduction, même partielle, est
                  soumise à autorisation préalable.
                </p>
                <p>
                  Certaines photographies sont des images libres de droit :
                  sources et licences sont détaillées dans le fichier
                  <code className="mx-1 rounded bg-papier-200 px-1.5 py-0.5 text-xs text-nuit-900">
                    public/images/CREDITS.md
                  </code>
                  du code source du site.
                </p>
              </Fiche>
            </Reveal>

            <Reveal delay={0.15}>
              <Fiche label="Données personnelles">
                <p>
                  Le site public ne collecte aucune donnée personnelle à
                  votre insu : il ne comporte aucun formulaire de contact —
                  seuls les liens téléphone et e-mail transmettent les
                  informations que vous choisissez d&apos;envoyer.
                </p>
                <p>
                  L&apos;espace administrateur, réservé à l&apos;équipe du
                  garage, utilise Firebase Authentication pour la connexion
                  des comptes internes.
                </p>
                <p>
                  Conformément au Règlement général sur la protection des
                  données (RGPD), vous disposez d&apos;un droit
                  d&apos;accès, de rectification et de suppression des
                  données vous concernant : contactez{" "}
                  <a
                    href={`mailto:${garageInfo.email}`}
                    className="text-flamme-600 hover:text-flamme-700"
                  >
                    {garageInfo.email}
                  </a>
                  . Vous pouvez également saisir la CNIL (cnil.fr) en cas de
                  réclamation.
                </p>
              </Fiche>
            </Reveal>

            <Reveal delay={0.2}>
              <Fiche label="Cookies">
                <p>
                  Le site n&apos;utilise aucun cookie de mesure
                  d&apos;audience ni de publicité. La page Contact intègre
                  une carte Google Maps : son affichage peut déposer des
                  cookies propres à Google, selon la politique de
                  confidentialité de Google.
                </p>
              </Fiche>
            </Reveal>

            <Reveal delay={0.25}>
              <Fiche label="Responsabilité et droit applicable">
                <p>
                  {garageInfo.name} s&apos;efforce d&apos;assurer
                  l&apos;exactitude des informations diffusées sur ce site,
                  sans garantie d&apos;exhaustivité. Les prix et
                  disponibilités des véhicules sont donnés à titre indicatif
                  et confirmés lors du contact avec l&apos;atelier.
                </p>
                <p>
                  Le présent site est soumis au droit français. Tout litige
                  relève de la compétence des tribunaux français.
                </p>
              </Fiche>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
