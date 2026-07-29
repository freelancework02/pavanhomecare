/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Primary Palette
        'primary-900': '#0B2A4A',
        'primary-700': '#114B8C',
        'primary-500': '#1E7FE0',
        'primary-100': '#E8F2FD',
        'primary-blue': '#0061FF',

        // Warm Accent Palette (Coral / Amber)
        'accent-500': '#F2994A',
        'accent-100': '#FCEEE0',

        // Sage Wellness Palette
        'sage-500': '#6FA98A',
        'sage-100': '#E7F2EC',

        // Neutrals & Surface
        'ink-900': '#10182B',
        'ink-600': '#4A5568',
        'ink-400': '#8892A0',
        'surface-0': '#FFFFFF',
        'surface-50': '#F7F9FC',

        // Legacy compatibility
        'secondary-cyan': '#60EFFF',
        'navy': '#0B2A4A',
        'slate-paragraph': '#4A5568',
      },
      fontFamily: {
        poppins: ['var(--font-heading)', 'Poppins', 'sans-serif'],
      },
      boxShadow: {
        'card-rest': '0 4px 20px rgba(16, 24, 43, 0.06)',
        'card-hover': '0 8px 30px rgba(16, 24, 43, 0.12)',
        'accent-glow': '0 8px 25px rgba(242, 153, 74, 0.35)',
      },
    },
  },
  plugins: [],
}

