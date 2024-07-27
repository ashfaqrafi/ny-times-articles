import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    APP_DOMAIN: "http://localhost:5173",
  },

  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: "cypress/support/commands.js",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
