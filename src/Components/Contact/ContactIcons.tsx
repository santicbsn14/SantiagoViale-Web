import React from 'react';

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

/* WhatsApp — globo de chat con teléfono */
export const WhatsAppIcon: React.FC = () => (
  <svg {...iconProps}>
    <path d="M3 21l1.65-4.8A9 9 0 1 1 7.8 19.35z" />
    <path d="M9 8.5c0 3.6 2.9 6.5 6.5 6.5l1-1.5-2-1-1 1a4 4 0 0 1-3-3l1-1-1-2z" />
  </svg>
);

/* Instagram — cuadrado redondeado con círculo y punto */
export const InstagramIcon: React.FC = () => (
  <svg {...iconProps}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.5 6.5h.01" />
  </svg>
);

/* Email — sobre */
export const MailIcon: React.FC = () => (
  <svg {...iconProps}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

/* LinkedIn — cuadrado con "in" */
export const LinkedInIcon: React.FC = () => (
  <svg {...iconProps}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 10.5v6" />
    <path d="M8 7.5h.01" />
    <path d="M12 16.5v-6" />
    <path d="M12 13a2.5 2.5 0 0 1 5 0v3.5" />
  </svg>
);

/* Ubicación — pin de mapa */
export const PinIcon: React.FC = () => (
  <svg {...iconProps}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
