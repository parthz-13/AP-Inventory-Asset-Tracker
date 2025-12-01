/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#7c3aed", // Violet-600
                secondary: "#475569", // Slate-600
                accent: "#10b981", // Emerald-500
                background: "#f8fafc", // Slate-50
                surface: "#ffffff", // White
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
