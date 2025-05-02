const config = {
  // plugins: ["@tailwindcss/postcss"],
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {
      overrideBrowserslist: ["> 1%", "last 2 versions", "iOS >= 10", "Safari >= 10"],
    },
  },
};

export default config;
