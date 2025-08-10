import Link from "next/link";

interface BackButtonProps {
  readonly href: string;
  readonly label?: string;
  readonly className?: string;
}

export default function BackButton({ href, label = "Volver" , className = "flex" }: BackButtonProps) {
  return (
    <Link
      href={href}
       className={`${className} flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-2 rounded shadow-md transition`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M9.707 14.707a1 1 0 01-1.414 0L3.586 10l4.707-4.707a1 1 0 111.414 1.414L6.414 10l3.293 3.293a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
        <path
          fillRule="evenodd"
          d="M16 10a1 1 0 01-1 1H5a1 1 0 010-2h10a1 1 0 011 1z"
          clipRule="evenodd"
        />
      </svg>
      {label}
    </Link>
  );
}
