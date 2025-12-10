
import React from 'react';

export const PowerIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
    <line x1="12" y1="2" x2="12" y2="12" />
  </svg>
);

export const GlobeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export const ZapIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export const UserIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const MenuIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export const LogOutIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export const CrownIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
    </svg>
);

export const ServerIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
        <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
        <line x1="6" x2="6.01" y1="6" y2="6" />
        <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
);

export const CountryFlag = ({ code, className }: { code: string; className?: string }) => {
    switch (code) {
        case 'JP':
            return (
                <svg viewBox="0 0 32 24" className={className} xmlns="http://www.w3.org/2000/svg">
                     <rect width="32" height="24" fill="white"/>
                     <circle cx="16" cy="12" r="7" fill="#BC002D"/>
                     <rect width="32" height="24" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                </svg>
            );
        case 'US':
            return (
                <svg viewBox="0 0 32 24" className={className} xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="24" fill="#B22234"/>
                    <g fill="white">
                        <rect y="2" width="32" height="2"/>
                        <rect y="6" width="32" height="2"/>
                        <rect y="10" width="32" height="2"/>
                        <rect y="14" width="32" height="2"/>
                        <rect y="18" width="32" height="2"/>
                        <rect y="22" width="32" height="2"/>
                    </g>
                    <rect width="16" height="13" fill="#3C3B6E"/>
                    <circle cx="2" cy="2" r="0.5" fill="white"/>
                    <circle cx="5" cy="2" r="0.5" fill="white"/>
                    <circle cx="8" cy="2" r="0.5" fill="white"/>
                    <circle cx="11" cy="2" r="0.5" fill="white"/>
                    <circle cx="14" cy="2" r="0.5" fill="white"/>
                    <circle cx="3.5" cy="4" r="0.5" fill="white"/>
                    <circle cx="6.5" cy="4" r="0.5" fill="white"/>
                    <circle cx="9.5" cy="4" r="0.5" fill="white"/>
                    <circle cx="12.5" cy="4" r="0.5" fill="white"/>
                    <rect width="32" height="24" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                </svg>
            );
        case 'SG':
            return (
                 <svg viewBox="0 0 32 24" className={className} xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="24" fill="white"/>
                    <rect width="32" height="12" fill="#EF3340"/>
                    <path d="M8,2.5 A3.5,3.5 0 0,0 8,9.5 A3.5,3.5 0 0,1 8,2.5" fill="white"/>
                    <circle cx="9.5" cy="4" r="0.7" fill="white"/>
                    <circle cx="11" cy="5" r="0.7" fill="white"/>
                    <circle cx="10.5" cy="7" r="0.7" fill="white"/>
                    <circle cx="8.5" cy="7" r="0.7" fill="white"/>
                    <circle cx="8" cy="5" r="0.7" fill="white"/>
                    <rect width="32" height="24" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                </svg>
            );
        case 'HK':
            return (
                 <svg viewBox="0 0 32 24" className={className} xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="24" fill="#DE2910"/>
                    <path d="M16,5 L17,9 L21,9 L18,12 L19,16 L16,13 L13,16 L14,12 L11,9 L15,9 Z" fill="white" transform="scale(0.8) translate(6, 4)"/>
                    <circle cx="16" cy="12" r="6" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3"/>
                    <rect width="32" height="24" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                </svg>
            );
         case 'GB':
            return (
                 <svg viewBox="0 0 32 24" className={className} xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="24" fill="#012169"/>
                    <path d="M0,0 L32,24 M32,0 L0,24" stroke="white" strokeWidth="4"/>
                    <path d="M0,0 L32,24 M32,0 L0,24" stroke="#C8102E" strokeWidth="2"/>
                    <path d="M16,0 V24 M0,12 H32" stroke="white" strokeWidth="6"/>
                    <path d="M16,0 V24 M0,12 H32" stroke="#C8102E" strokeWidth="3"/>
                    <rect width="32" height="24" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                </svg>
            );
        case 'KR':
            return (
                 <svg viewBox="0 0 32 24" className={className} xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="24" fill="white"/>
                    <circle cx="16" cy="12" r="7" fill="#CD2E3A"/>
                    <path d="M16,12 A7,7 0 0,0 16,19 A3.5,3.5 0 0,0 16,12" fill="#0047A0"/>
                    <path d="M16,12 A3.5,3.5 0 0,1 16,5 A7,7 0 0,0 16,12" fill="#CD2E3A"/>
                    <g fill="black">
                        <rect x="5" y="4" width="2" height="16" transform="rotate(35 6 12)" />
                        <rect x="8" y="4" width="2" height="16" transform="rotate(35 9 12)" />
                        <rect x="23" y="4" width="2" height="16" transform="rotate(-35 24 12)" />
                        <rect x="26" y="4" width="2" height="16" transform="rotate(-35 27 12)" />
                    </g>
                    <rect width="32" height="24" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                </svg>
            );
        case 'NL':
             return (
                 <svg viewBox="0 0 32 24" className={className} xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="8" y="0" fill="#AE1C28"/>
                    <rect width="32" height="8" y="8" fill="white"/>
                    <rect width="32" height="8" y="16" fill="#21468B"/>
                    <rect width="32" height="24" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                </svg>
            );
        case 'TW':
             return (
                 <svg viewBox="0 0 32 24" className={className} xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="24" fill="#FE0000"/>
                    <rect width="16" height="12" fill="#000095"/>
                    <circle cx="8" cy="6" r="3" fill="white"/>
                     <circle cx="8" cy="6" r="1.5" fill="#000095"/>
                    <rect width="32" height="24" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                </svg>
            );
        case 'AU':
             return (
                 <svg viewBox="0 0 32 24" className={className} xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="24" fill="#00008B"/>
                    {/* Union Jack Simplification */}
                    <path d="M0,0 L16,12 M16,0 L0,12" stroke="white" strokeWidth="2"/>
                    <path d="M8,0 V12 M0,6 H16" stroke="white" strokeWidth="3"/>
                    <path d="M8,0 V12 M0,6 H16" stroke="#CD2E3A" strokeWidth="1.5"/>
                    {/* Stars */}
                    <circle cx="24" cy="6" r="1.5" fill="white"/>
                    <circle cx="20" cy="14" r="0.8" fill="white"/>
                    <circle cx="27" cy="12" r="0.8" fill="white"/>
                    <circle cx="22" cy="18" r="0.8" fill="white"/>
                    <circle cx="26" cy="18" r="0.8" fill="white"/>
                    <rect width="32" height="24" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                </svg>
            );
        case 'CA':
             return (
                 <svg viewBox="0 0 32 24" className={className} xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="24" fill="#FF0000"/>
                    <rect x="8" width="16" height="24" fill="white"/>
                    <path d="M16 4 L17 10 L22 8 L18 14 L20 18 L16 16 L12 18 L14 14 L10 8 L15 10 Z" fill="#FF0000"/>
                    <rect width="32" height="24" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                </svg>
            );
        case 'FR':
             return (
                 <svg viewBox="0 0 32 24" className={className} xmlns="http://www.w3.org/2000/svg">
                    <rect x="0" width="11" height="24" fill="#002395"/>
                    <rect x="11" width="10" height="24" fill="white"/>
                    <rect x="21" width="11" height="24" fill="#ED2939"/>
                    <rect width="32" height="24" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                </svg>
            );
        case 'IN':
             return (
                 <svg viewBox="0 0 32 24" className={className} xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="8" y="0" fill="#FF9933"/>
                    <rect width="32" height="8" y="8" fill="white"/>
                    <rect width="32" height="8" y="16" fill="#138808"/>
                    <circle cx="16" cy="12" r="2.5" fill="none" stroke="#000080" strokeWidth="0.5"/>
                    <circle cx="16" cy="12" r="0.5" fill="#000080"/>
                    <rect width="32" height="24" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                </svg>
            );
        case 'BR':
             return (
                 <svg viewBox="0 0 32 24" className={className} xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="24" fill="#009C3B"/>
                    <polygon points="16,4 28,12 16,20 4,12" fill="#FFDF00"/>
                    <circle cx="16" cy="12" r="3.5" fill="#002776"/>
                    <path d="M13,12 Q16,10 19,12" stroke="white" strokeWidth="0.5" fill="none"/>
                    <rect width="32" height="24" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                </svg>
            );
        case 'DE':
             return (
                 <svg viewBox="0 0 32 24" className={className} xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="8" y="0" fill="black"/>
                    <rect width="32" height="8" y="8" fill="#DD0000"/>
                    <rect width="32" height="8" y="16" fill="#FFCC00"/>
                    <rect width="32" height="24" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                </svg>
            );
        case 'RU':
             return (
                 <svg viewBox="0 0 32 24" className={className} xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="8" y="0" fill="white"/>
                    <rect width="32" height="8" y="8" fill="#0039A6"/>
                    <rect width="32" height="8" y="16" fill="#D52B1E"/>
                    <rect width="32" height="24" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                </svg>
            );
        default:
            return (
                 <svg viewBox="0 0 32 24" className={className} xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="24" fill="#cbd5e1"/>
                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="10" fill="white">?</text>
                </svg>
            );
    }
}