/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textColor: {
        blue1: "#D2E0FB",
        blue2: "#C1D3F0",
        blue3: "#B0C6E4",
        blue4: "#9FB9D9",
        blue5: "#8EACCD",
        blue6: "#7D97B4",
        blue7: "#506174",
        blue8: "#596C81",
      },
      backgroundColor: {
        blue0: "#E9F0FD",
        blue1: "#D2E0FB",
        blue2: "#C1D3F0",
        blue3: "#B0C6E4",
        blue4: "#9FB9D9",
        blue5: "#8EACCD",
        blue6: "#7D97B4",
        blue7: "#506174",
        blue8: "#596C81",
      },
      borderColor: {
        blue1: "#D2E0FB",
        blue2: "#C1D3F0",
        blue3: "#B0C6E4",
        blue4: "#9FB9D9",
        blue5: "#8EACCD",
        blue6: "#7D97B4",
      },
      ringColor: {
        blue3: "#B0C6E4",
      },
    },
  },
  plugins: [],
};
