// Small inline stroke icons, brand-green by default.
const base = (size) => ({ width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: '#3DB54E', strokeWidth: 1.6 })

export const Shield = ({ size = 18 }) => (
  <svg {...base(size)}>
    <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
  </svg>
)
export const ShieldCheck = ({ size = 18 }) => (
  <svg {...base(size)}>
    <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)
export const Card = ({ size = 18 }) => (
  <svg {...base(size)}>
    <rect x="4" y="5" width="16" height="14" rx="2" />
    <path d="M4 10h16M9 15h3" />
  </svg>
)
export const Launch = ({ size = 18 }) => (
  <svg {...base(size)}>
    <path d="M12 3v18M3 8h18M5 8l7-5 7 5" />
  </svg>
)
export const CheckDoc = ({ size = 18 }) => (
  <svg {...base(size)}>
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
  </svg>
)
export const Clock = ({ size = 18 }) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)
export const Spark = ({ size = 18 }) => (
  <svg {...base(size)} strokeWidth="1.7">
    <path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" />
  </svg>
)
export const Pin = ({ size = 20 }) => (
  <svg {...base(size)}>
    <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
  </svg>
)
export const Phone = ({ size = 20 }) => (
  <svg {...base(size)}>
    <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.5-1.1a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z" />
  </svg>
)
export const Mail = ({ size = 20 }) => (
  <svg {...base(size)}>
    <path d="M4 4h16v16H4z" />
    <path d="M22 6l-10 7L2 6" />
  </svg>
)
