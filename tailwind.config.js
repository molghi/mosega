/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
    daisyui: {
        themes: ["light", "dark", "cupcake"], // 'true' to include all
    },
};
