"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { garageInfo } from "@/lib/garageInfo";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/voitures", label: "Nos voitures" },
  { href: "/services", label: "Nos services" },
  { href: "/contact", label: "Contact" },
];

function normalize(path: string): string {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

export default function SiteHeader() {
  const pathname = normalize(usePathname() ?? "/");
  const [open, setOpen] = useState(false);

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-nuit-900/10 bg-papier-50/85 text-nuit-900 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center bg-flamme-600 font-bold text-white"
          >
            GC
          </span>
          <span className="flex flex-col leading-tight">
            <span className="titre-scene text-lg text-nuit-950">
              {garageInfo.name}
            </span>
            <span className="repere-scene hidden text-[10px] text-acier-600 sm:block">
              {garageInfo.address.city}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-flamme-600"
                  : "text-acier-600 hover:text-nuit-950"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`tel:${garageInfo.phone}`}
            className="ml-3 bg-nuit-950 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-flamme-700"
          >
            {garageInfo.phoneDisplay}
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Ouvrir le menu de navigation"
          className="inline-flex h-10 w-10 items-center justify-center border border-nuit-900/20 text-nuit-900 md:hidden"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <nav className="border-t border-nuit-900/10 bg-papier-50 md:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`border-b border-nuit-900/10 px-1 py-3 text-sm font-medium last:border-0 ${
                  isActive(link.href)
                    ? "text-flamme-600"
                    : "text-nuit-900 hover:text-flamme-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${garageInfo.phone}`}
              className="mt-3 bg-nuit-950 px-3 py-3 text-center text-sm font-semibold text-white"
            >
              Appeler le {garageInfo.phoneDisplay}
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
