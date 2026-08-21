import type { ServiceIconName } from "@/types";

const PATHS: Record<ServiceIconName, React.ReactNode> = {
  vidange: (
    <>
      <path d="M4 8h9l3 3h4v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z" />
      <path d="M8 8V5h4v3" />
      <path d="M12 18v3" />
    </>
  ),
  revision: (
    <>
      <path d="M14.5 4.5a4.5 4.5 0 0 0-5.9 5.9L4 15l3.5 3.5 4.6-4.6a4.5 4.5 0 0 0 5.9-5.9l-2.7 2.7-2.1-2.1 2.7-2.7Z" />
    </>
  ),
  pneus: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 3.5v5M12 15.5v5M3.5 12h5M15.5 12h5" />
    </>
  ),
  controle: (
    <>
      <path d="M6 3h9l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v5h5" />
      <path d="m9 14 2 2 4-4" />
    </>
  ),
  diagnostic: (
    <>
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="m6 12 2.5-3 2 5 2-3.5 1.5 2h4" />
      <path d="M9 21h6" />
    </>
  ),
  freins: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3.5 12 8M20.5 12 16 12M12 20.5 12 16M3.5 12 8 12" />
    </>
  ),
  climatisation: (
    <>
      <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
      <path d="m9 5 3 2 3-2M9 19l3-2 3 2" />
    </>
  ),
  batterie: (
    <>
      <rect x="4" y="8" width="16" height="10" rx="1.5" />
      <path d="M8 8V6M16 8V6" />
      <path d="M9 12.5h2M14.5 11v3M13 12.5h3" />
    </>
  ),
  embrayage: (
    <>
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 5v2M12 17v2M5 12h2M17 12h2M7.5 7.5l1.4 1.4M15.1 15.1l1.4 1.4M7.5 16.5l1.4-1.4M15.1 8.9l1.4-1.4" />
    </>
  ),
  suspension: (
    <>
      <path d="M12 2v2.5" />
      <path d="M8 5.5h8M8 8.5h8M8 11.5h8M8 14.5h8M8 17.5h8" />
      <path d="M12 19.5V22" />
    </>
  ),
  carrosserie: (
    <>
      <path d="M4 15l1.5-5.5A2 2 0 0 1 7.4 8h9.2a2 2 0 0 1 1.9 1.5L20 15" />
      <path d="M3.5 15h17v3a1 1 0 0 1-1 1H4.5a1 1 0 0 1-1-1v-3Z" />
      <circle cx="8" cy="18.5" r="1.2" />
      <circle cx="16" cy="18.5" r="1.2" />
    </>
  ),
  vitrage: (
    <>
      <path d="M4 16 6 6h12l2 10" />
      <path d="M4 16h16" />
      <path d="m10.5 6-2 6 2.5 1-1.5 3" />
    </>
  ),
  antivol: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      <circle cx="12" cy="15" r="1.3" />
      <path d="M12 16.3V18" />
    </>
  ),
  nettoyage: (
    <>
      <path d="M12 3c-1.3 3-4 4.3-4 7.3a4 4 0 0 0 8 0c0-3-2.7-4.3-4-7.3Z" />
      <path d="M5 5.5l1 1M18 5.5l-1 1M4.5 12.5h1.2M18.3 12.5h1.2" />
    </>
  ),
  depannage: (
    <>
      <path d="M12 3 2.5 20h19L12 3Z" />
      <path d="M12 10v4" />
      <path d="M12 17h.01" />
    </>
  ),
};

export default function ServiceIcon({
  name,
  className = "h-6 w-6",
}: {
  name: ServiceIconName;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[name] ?? PATHS.revision}
    </svg>
  );
}
