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
    extend: {
      fontSize: {
        dynamic: "var(--font-size-dynamic)",
      },
    },
  },
  plugins: [],
};
