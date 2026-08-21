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
