import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    listStyleType: {
      square: "square",
      disc: "disc",
      decimal: "decimal",
    },
    colors: {
      transparent: "transparent",
      "ninjack-black": "#000000",
      "ninjack-bg-gray": "#171717",
      "ninjack-line-gray": "#2e2e2e",
      "ninjack-text-gray": "#7a7a7a",
      "ninjack-purple": "#803EB2",
    },
    fontFamily: {
      NotoSansJp: ["var(--font-NotoSansJp)"],
      Geist: ["var(--font-Geist)"],
      Barlow: ["var(--font-Barlow)"],
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
