/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6C47DB",
        primarydark: "rgba(108, 71, 219, 0.4)",
      },
      fontFamily: {
        primary: "Inter",
      },
      boxShadow: {
        first: "0px 4px 4px 0px rgba(0,0,0,0.25)",
      },
      animation: {
        expand: "expand 2s infinite ease-out",
      },
      keyframes: {
        expand: {
          "0%, 100%": { height: "0" },
          "50%": { height: "100%" },
        },
      },
    },
  },
  plugins: [],
};
