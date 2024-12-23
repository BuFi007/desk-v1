import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  safelist: [
    "dark",
    // Add "theme-yellow" so Tailwind knows about it
    "theme-yellow",
    "theme-blue",
    "theme-green",
    "theme-orange",
    "theme-red",
    "theme-purple",
    // Also add the " dark" variants if you need them:
    "theme-yellow dark",
    "theme-blue dark",
    "theme-green dark",
    "theme-orange dark",
    "theme-red dark",
    "theme-purple dark",
  ],
  theme: {
    extend: {
      colors: {
        fontFamily: {
          sans: "var(--font-geist-sans)",
          mono: "var(--font-geist-mono)",
          neue: "BaseNeue, sans-serif",
          nupower: "PowerNeue, sans-serif",
        },
        main: "var(--main)",
        bg: "var(--bg)",
        text: "var(--text)",
        border: "var(--border)",
        overlay: "var(--overlay)",
        bw: "var(--bw)",
        blank: "var(--blank)",
        mtext: "var(--mtext)",
        ring: "var(--ring)",
        ringOffset: "var(--ring-offset)",

        // dark mode
        darkBg: "var(--dark-bg)",
        darkText: "var(--dark-text)",

        darkBorder: "var(--dark-border)",
        darkNavBorder: "var(--dark-nav-border)",

        secondaryBlack: "var(--secondary-black)",
        mongoose: {
          "50": "#f9f7f3",
          "100": "#f1ede3",
          "200": "#e2d9c6",
          "300": "#cfc0a2",
          "400": "#bca47f",
          "500": "#ac8c63",
          "600": "#9f7b57",
          "700": "#856449",
          "800": "#6c5240",
          "900": "#584436",
          "950": "#2f221b",
        },
        rose: {
          "50": "#faf6f6",
          "100": "#f5ebeb",
          "200": "#eedada",
          "300": "#e1c0c0",
          "400": "#ce9b9b",
          "500": "#bc7f7f",
          "600": "#a35f5f",
          "700": "#884d4d",
          "800": "#714343",
          "900": "#603c3c",
          "950": "#321d1d",
        },
        blue: {
          "50": "#f0fbfa",
          "100": "#d8f4f5",
          "200": "#b6e9eb",
          "300": "#83d7dd",
          "400": "#3bb3bd",
          "500": "#2ea1ac",
          "600": "#298391",
          "700": "#276a77",
          "800": "#285762",
          "900": "#254a54",
          "950": "#143038",
        },
        green: {
          "50": "#f1f8f2",
          "100": "#ddeede",
          "200": "#bcdec1",
          "300": "#7fbc8c",
          "400": "#61a672",
          "500": "#408955",
          "600": "#2e6d41",
          "700": "#255735",
          "800": "#1f462c",
          "900": "#1a3a25",
          "950": "#0e2015",
          "1000": "#A3E636",
        },
        orange: {
          "50": "#fdf5ef",
          "100": "#fae8da",
          "200": "#f3ceb4",
          "300": "#ebae86",
          "400": "#e28355",
          "500": "#dc6333",
          "600": "#cd4d29",
          "700": "#aa3b24",
          "800": "#883124",
          "900": "#6e2a20",
          "950": "#3b130f",
        },
        vermillion: {
          "50": "#fff4ed",
          "100": "#ffe6d4",
          "200": "#ffc8a8",
          "300": "#ffa170",
          "400": "#ff6e37",
          "500": "#ff4911",
          "600": "#f02d06",
          "700": "#c71e07",
          "800": "#9e190e",
          "900": "#7f180f",
          "950": "#450805",
        },
        lavender: {
          "50": "#faf8fc",
          "100": "#f3f0f7",
          "200": "#ebe3f1",
          "300": "#dacce6",
          "400": "#c2abd5",
          "500": "#a17fbc",
          "600": "#936fae",
          "700": "#7d5a96",
          "800": "#694d7c",
          "900": "#563f64",
          "950": "#382645",
        },
        nepal: {
          "50": "#f4f9fa",
          "100": "#e6eff3",
          "200": "#d4e2e9",
          "300": "#b6d0da",
          "400": "#93b8c7",
          "500": "#7fa6bc",
          "600": "#668daa",
          "700": "#5a7c9b",
          "800": "#4e667f",
          "900": "#415567",
          "950": "#2b3540",
        },
        cerulean: {
          "50": "#edf8ff",
          "100": "#d8efff",
          "200": "#b9e3ff",
          "300": "#89d2ff",
          "400": "#51b8ff",
          "500": "#2998ff",
          "600": "#1179ff",
          "700": "#0b60ea",
          "800": "#104fc1",
          "900": "#134595",
          "950": "#112b5a",
        },
      },
      borderRadius: {
        base: "10px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        light: "4px 4px 0px 0px #000",
        dark: "4px 4px 0px 0px #000",
      },
      translate: {
        boxShadowX: "4px",
        boxShadowY: "4px",
        reverseBoxShadowX: "-4px",
        reverseBoxShadowY: "-4px",
      },
      fontWeight: {
        base: "600",
        heading: "700",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "background-position-spin": {
          "0%": { backgroundPosition: "top center" },
          "100%": { backgroundPosition: "bottom center" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        jiggle: {
          "0%": {
            transform: "rotate(-4deg)",
          },
          "50%": {
            transform: "rotate(4deg)",
          },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
        "webgl-scale-in-fade": {
          "0%": {
            opacity: "0",
            transform: "scale(.7)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "open-scale-up-fade": {
          "0%": {
            opacity: "0",
            transform: "scale(.98) translateY(5px)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) translateY(0)",
          },
        },
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "animate-webgl-scale-in-fade": "webgl-scale-in-fade 1s ease-in-out",
        "open-scale-up-fade": "open-scale-up-fade",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        grid: "grid 15s linear infinite",
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
        "background-position-spin":
          "background-position-spin 3000ms infinite alternate",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      screens: {
        "3xl": "1800px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
