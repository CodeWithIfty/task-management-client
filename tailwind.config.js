export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B68FF", // Replace this with your desired primary color hex value
      },
    },
  },
  plugins: [require("daisyui")],
};
