import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'wfh-blue': '#0026FF',
      },
      fontFamily: {
        'crimson-text': ['var(--font-crimson-text)', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;

