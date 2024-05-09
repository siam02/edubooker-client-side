/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      Inter: ['"Inter"', 'sans-serif', ...defaultTheme.fontFamily.sans]
    }
  },
  daisyui: {
    themes: [{
      light: {
        "primary": "#0000ff",
        "primary-content": "#c6dbff",
        "secondary": "#00a6f0",
        "secondary-content": "#000a14",
        "accent": "#009600",
        "accent-content": "#000800",
        "neutral": "#051100",
        "neutral-content": "#c5c9c3",
        "base-100": "#ffffff",
        "base-200": "#dedede",
        "base-300": "#bebebe",
        "base-content": "#161616",
        "info": "#00beff",
        "info-content": "#000d16",
        "success": "#009465",
        "success-content": "#000803",
        "warning": "#ffb200",
        "warning-content": "#160c00",
        "error": "#e8002b",
        "error-content": "#ffd8d4",
      },
    },
      "light",
      "dark",
    ]
  },
  plugins: [
    require('daisyui'),
  ],
}

