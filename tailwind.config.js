/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // This line is crucial. It tells Tailwind to look at all .js and .jsx files
    // inside the src folder and all its subfolders.
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}