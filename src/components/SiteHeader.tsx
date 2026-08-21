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
    <header className="sticky top-0 z-50 border-b border-nuit-800 bg-nuit-900 text-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-flamme-600 font-bold text-white"
          >
            GC
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-semibold tracking-tight">
              {garageInfo.name}
            </span>
            <span className="hidden text-[11px] uppercase tracking-widest text-nuit-200 sm:block">
              {garageInfo.address.city}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-nuit-800 text-flamme-500"
                  : "text-nuit-100 hover:bg-nuit-800 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`tel:${garageInfo.phone}`}
            className="ml-3 rounded-md bg-flamme-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-flamme-700"
          >
            {garageInfo.phoneDisplay}
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Ouvrir le menu de navigation"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-nuit-700 text-white md:hidden"
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
        <nav className="border-t border-nuit-800 bg-nuit-900 md:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  isActive(link.href)
                    ? "bg-nuit-800 text-flamme-500"
                    : "text-nuit-100 hover:bg-nuit-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${garageInfo.phone}`}
              className="mt-2 rounded-md bg-flamme-600 px-3 py-2 text-center text-sm font-semibold text-white"
            >
              Appeler le {garageInfo.phoneDisplay}
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
