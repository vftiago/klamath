/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

const customTimingFunction = "cubic-bezier(0.215, 0.61, 0.355, 1)";

export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      animation: {
        waterfall: `waterfall 1.5s infinite ${customTimingFunction}`,
      },
      keyframes: {
        waterfall: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      transitionTimingFunction: {
        "out-expo": customTimingFunction,
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        },
      );
    }),
  ],
};
