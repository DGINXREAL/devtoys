import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        'buttercup': {
          '50': '#fdf9e9',
          '100': '#fbf2c6',
          '200': '#f9e18f',
          '300': '#f5c94f',
          '400': '#f0b223',
          '500': '#e09912',
          '600': '#c1750d',
          '700': '#9a530e',
          '800': '#804213',
          '900': '#6d3616',
          '950': '#3f1b09',
        },

      },
    },
  },
  plugins: [],
} satisfies Config;
