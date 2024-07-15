/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  // eslint-disable-next-line global-require
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      transparent: "transparent",
      white: "#fff",
      black: "#000",
      primaryColor: "#4A90E2",
      secondaryColor: "#F2F2F2",
      accentColor: "#FFA500",
      textColorPrimary: "#333333",
      textColorSecondary: "#7F8C8D",
      successColor: "#2ECC71",
      errorColor: "#E74C3C",
      backdrop: "rgba(0,0,0,0.3)",
    },
    extend: {
      fontSize: {
        dynamic: "var(--font-size-dynamic)",
      },
    },
  },
  plugins: [],
};
