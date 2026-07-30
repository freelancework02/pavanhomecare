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
        // Official Brand Core
        'brand-blue': '#0061FF',
        'brand-sky': '#60EFFF',

        // Derived Primary Scale
        'primary-900': '#001A4D',
        'primary-700': '#0047B8',
        'primary-500': '#0061FF',
        'primary-300': '#4C9EFF',
        'primary-100': '#E8F2FF',

        // Sky Accent
        'sky-500': '#60EFFF',
        'sky-100': '#E3FBFF',

        // Warm Coral Accent
        'accent-500': '#FF7A59',
        'accent-100': '#FFEDE7',
        'warm-accent-500': '#FF7A59',
        'warm-accent-100': '#FFEDE7',

        // Neutrals & Surface
        'ink-900': '#0B1730',
        'ink-600': '#4A5A73',
        'ink-400': '#8A97AC',
        'surface-0': '#FFFFFF',
        'surface-50': '#F5F9FF',
        'border-subtle': '#DCE7F7',

        // System Compatibility
        'navy': '#001A4D',
      },
      borderRadius: {
        'card': '16px',
        'pill': '999px',
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

