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
        'primary-blue': '#0061FF',
        'secondary-cyan': '#60EFFF',
        'navy': '#0F172A',
        'slate-paragraph': '#64748B',
      },
      fontFamily: {
        poppins: ['var(--font-heading)', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
