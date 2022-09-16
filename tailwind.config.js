function withOpacityValue(variable) {
    return ({ opacityValue }) => {
        if (opacityValue === undefined) {
            return `var(${variable})`; // return `rgb(var(${variable}))`;
        }
        return `var(${variable})`; // return `rgb(var(${variable}) / ${opacityValue})`;
    };
}

module.exports = {
    mode: "jit", // criar o css necessario somente que o app precisa
    content: ["./src/components/**/*.tsx", "./src/pages/**/*.tsx"],
    darkMode: "class",

    // variants: {
    //     typography: ['dark'],
    //   },

    theme: {
        // defaultTheme: {},

        fontFamily: {
            sans: ["Inter", "sans-serif"],
        },

        extend: {
            colors: {
                primary: withOpacityValue("--color-primary"),
                danger: withOpacityValue("--color-danger"),
            },

            backgroundImage: {
                galaxy: "url('/assets/background.jpg')",
                "nlw-gradient":
                    "linear-gradient(90deg, #9572FC 0%, #43E7AD 50%, #e1D55d 100%)",

                "game-gradient":
                    "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 70%)",
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
        require("tailwind-scrollbar"),
        require("@tailwindcss/line-clamp"),
    ],
};
