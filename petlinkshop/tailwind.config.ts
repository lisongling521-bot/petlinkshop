import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#24313a",
        muted: "#66737f",
        ivory: "#fbfaf6",
        sand: "#f1eadf",
        teal: "#0b6b73",
        coral: "#e66f5c"
      },
      boxShadow: {
        soft: "0 24px 70px rgba(29, 42, 53, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
