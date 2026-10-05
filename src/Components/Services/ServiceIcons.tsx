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

/* Herramientas puntuales — llave de herramienta */
export const ToolIcon: React.FC = () => (
  <svg {...iconProps}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

/* Webs y catálogos — ventana de navegador */
export const BrowserIcon: React.FC = () => (
  <svg {...iconProps}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18" />
    <path d="M6 6.5h.01M8.5 6.5h.01" />
    <rect x="6" y="12" width="5" height="5" rx="1" />
    <path d="M14 13h4M14 16h3" />
  </svg>
);

/* Sistemas de turnos — calendario con tilde */
export const CalendarCheckIcon: React.FC = () => (
  <svg {...iconProps}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18" />
    <path d="M8 3v4M16 3v4" />
    <path d="m9 15.5 2 2 4-4" />
  </svg>
);

/* Gestión a medida — panel con gráfico de barras */
export const DashboardIcon: React.FC = () => (
  <svg {...iconProps}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M8 17v-4M12 17V8M16 17v-6" />
  </svg>
);
