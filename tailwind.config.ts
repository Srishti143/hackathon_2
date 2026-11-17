import type { Config } from "tailwindcss";

const config: Config = {
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
                "burnt-orange": "#BF5700",
                "mustard-yellow": "#E1AD01",
                "deep-teal": "#004B49",
                cream: "#F5F5DC",
                "coffee-brown": "#4B3621",
            },
            fontFamily: {
                serif: ["var(--font-serif)"],
                mono: ["var(--font-mono)"],
                body: ["var(--font-body)"],
                labels: ["var(--font-labels)"],
            },
        },
    },
    plugins: [],
};
export default config;
