/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E40AF",
          light: "#3B82F6",
          dark: "#1E3A8A",
        },
        secondary: {
          DEFAULT: "#9333EA",
          light: "#A855F7",
          dark: "#7E22CE",
        },
        accent: {
          DEFAULT: "#F59E0B",
          light: "#FBBF24",
          dark: "#B45309",
        },
        neutral: {
          light: "#F3F4F6",
          DEFAULT: "#6B7280",
          dark: "#111827",
        },
      },
      fontFamily: {
        sans: ["'SUSE Mono'", "system-ui", "sans-serif"],  // 👈 your new default
        heading: ["'SUSE Mono'", "sans-serif"],            // 👈 headings too
      },
      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,0.08)",
        modal: "0 8px 30px rgba(0,0,0,0.15)",
      },
      animation: {
        fade: "fadeIn 0.3s ease-in-out",
        slide: "slideIn 0.3s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
}
