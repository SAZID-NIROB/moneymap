/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#effaf7",
          100: "#d4f5ec",
          200: "#ace8d8",
          300: "#7cd7c0",
          400: "#46bea5",
          500: "#2da38b",
          600: "#20826f",
          700: "#1d685a",
          800: "#1b5348",
          900: "#19453d"
        }
      },
      boxShadow: {
        glass: "0 24px 80px rgba(15, 23, 42, 0.16)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(45, 163, 139, 0.18), transparent 35%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.12), transparent 30%)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" }
        },
        appear: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        appear: "appear 0.4s ease forwards"
      }
    }
  },
  plugins: []
};
