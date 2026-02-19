// src/theme/fontTheme.ts
export const fontTheme = {
  family: {
    sans: "'Inter', system-ui, -apple-system, sans-serif",
    mono: "'Fira Code', 'Consolas', monospace",
  },
  size: {
    xs:   "0.75rem",   // 12px
    sm:   "0.875rem",  // 14px
    base: "1rem",      // 16px
    md:   "1.125rem",  // 18px
    lg:   "1.25rem",   // 20px
    xl:   "1.5rem",    // 24px
    "2xl":"1.875rem",  // 30px
    "3xl":"2.25rem",   // 36px
    "4xl":"3rem",      // 48px
    "5xl":"3.75rem",   // 60px
  },
  weight: {
    normal:   400,
    medium:   500,
    semibold: 600,
    bold:     700,
    extrabold:800,
  },
  lineHeight: {
    tight:  1.2,
    normal: 1.5,
    relaxed:1.75,
  },
} as const;
