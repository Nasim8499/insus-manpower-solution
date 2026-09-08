import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { children: ReactNode };

function I({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const SearchIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </I>
);

export const XIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </I>
);

export const ChevronDown = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="m6 9 6 6 6-6" />
  </I>
);

export const ChevronRight = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="m9 6 6 6-6 6" />
  </I>
);

export const ArrowRight = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </I>
);

export const ArrowUp = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M12 19V5" />
    <path d="m6 11 6-6 6 6" />
  </I>
);

export const PhoneIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </I>
);

export const PhoneCallIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    <path d="M14.05 2a9 9 0 0 1 8 7.94" />
    <path d="M14.05 6A5 5 0 0 1 18 10" />
  </I>
);

export const MailIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </I>
);

export const ShieldCheckIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </I>
);

export const ShieldAlertIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </I>
);

export const AlertIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="m10.29 3.86-8.47 14.14A2 2 0 0 0 3.53 21h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </I>
);

export const CheckIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M20 6 9 17l-5-5" />
  </I>
);

export const CheckCircleIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </I>
);

export const XCircleIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </I>
);

export const HomeIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <path d="M9 22V12h6v10" />
  </I>
);

export const HelpIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </I>
);

export const FileTextIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
  </I>
);

export const BriefcaseIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </I>
);

export const PlaneIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  </I>
);

export const StethoscopeIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M11 2v2" />
    <path d="M5 2v2" />
    <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
    <path d="M8 15a6 6 0 0 0 12 0v-3" />
    <circle cx="20" cy="10" r="2" />
  </I>
);

export const WalletIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 1 0-4h3" />
    <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    <path d="M18 12v.5" />
  </I>
);

export const BuildingIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M3 21h18" />
    <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
    <path d="M9 7h.01" />
    <path d="M9 11h.01" />
    <path d="M9 15h.01" />
    <path d="M15 7h.01" />
    <path d="M15 11h.01" />
    <path d="M15 15h.01" />
  </I>
);

export const ListChecksIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="m3 7 2 2 4-4" />
    <path d="m3 17 2 2 4-4" />
    <path d="M13 8h8" />
    <path d="M13 18h8" />
  </I>
);

export const ClipboardListIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M9 12h6" />
    <path d="M9 16h6" />
  </I>
);

export const SparklesIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
    <path d="M19 15l.7 1.8L21.5 17.5 19.7 18.2 19 20l-.7-1.8L16.5 17.5 18.3 16.8z" />
  </I>
);

export const BadgeCheckIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z" />
    <path d="m9 12 2 2 4-4" />
  </I>
);

export const ClockIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </I>
);

export const GlobeIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </I>
);

export const ReceiptIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z" />
    <path d="M8 8h8" />
    <path d="M8 12h8" />
    <path d="M8 16h5" />
  </I>
);

export const RouteIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <circle cx="6" cy="19" r="3" />
    <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
    <circle cx="18" cy="5" r="3" />
  </I>
);

export const LayersIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="m12 2 10 5-10 5L2 7z" />
    <path d="m2 12 10 5 10-5" />
    <path d="m2 17 10 5 10-5" />
  </I>
);

export const InfoIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </I>
);

/* ---- Sectors ---- */
export const FactoryIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M2 20h20" />
    <path d="M4 20V8l5 3.5V8l5 3.5V6l6 4v10" />
    <path d="M9 20v-4h3v4" />
    <path d="M17 14h.01" />
    <path d="M17 17h.01" />
  </I>
);

export const ShipIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" />
    <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
    <path d="M12 10v4" />
    <path d="M12 2v3" />
  </I>
);

export const FlaskIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M10 2v7.31" />
    <path d="M14 9.3V2" />
    <path d="M8.5 2h7" />
    <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
    <path d="M5.58 16.5h12.85" />
  </I>
);

export const HeadsetIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a1 1 0 0 1-1-1z" />
    <path d="M21 11h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2a1 1 0 0 0 1-1z" />
    <path d="M3 11a9 9 0 0 1 18 0" />
    <path d="M21 16v1a3 3 0 0 1-3 3h-3" />
  </I>
);

/* ---- Install / PWA ---- */
export const DownloadIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="M7 10l5 5 5-5" />
    <path d="M12 15V3" />
  </I>
);

export const ShareIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="m16 6-4-4-4 4" />
    <path d="M12 2v13" />
  </I>
);

export const PlusIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </I>
);

export const GridIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
  </I>
);

/* ---- Admin ---- */
export const SettingsIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </I>
);

export const TrashIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
  </I>
);

export const ArrowDownIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M12 5v14" />
    <path d="m6 13 6 6 6-6" />
  </I>
);

export const RotateIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </I>
);

export const UploadIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="M17 8l-5-5-5 5" />
    <path d="M12 3v12" />
  </I>
);

export const LockIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </I>
);

export const EditIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z" />
  </I>
);

export const EyeIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </I>
);

export const StarIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
  </I>
);

export const MapPinIcon = (p: SVGProps<SVGSVGElement>) => (
  <I {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </I>
);

export const iconMap = {
  briefcase: BriefcaseIcon,
  building: BuildingIcon,
  stethoscope: StethoscopeIcon,
  fileText: FileTextIcon,
  plane: PlaneIcon,
  wallet: WalletIcon,
  factory: FactoryIcon,
  ship: ShipIcon,
  flask: FlaskIcon,
  headset: HeadsetIcon,
};
