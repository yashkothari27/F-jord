// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        default: "var(--bg-default)",
        light: "var(--bg-light)",
        accent: "var(--accent)",
        placehover: "var(--bg-placehover)",
        footer: "var(--footer-bottom)",
        "text-default": "var(--text-default)",
      },
      keyframes: {
        "fade-down": {
          "0%": { opacity: "0", transform: "translateY(-90%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-down": "fade-down 0.7s ease-out",
      },
    },
  },
  plugins: [],
};

// extend: {
//   // screens: {
//   //   hoverNonTouch: { raw: "(hover: hover) and (pointer: fine)" },
//   // },
