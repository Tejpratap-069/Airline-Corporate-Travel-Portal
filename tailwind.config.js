/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        navy: {
          800: "#10294d",
          900: "#0b1e3a",
          950: "#071530",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(7, 21, 48, 0.08)",
      },
    },
  },
  plugins: [],
};
