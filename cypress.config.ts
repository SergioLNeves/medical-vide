import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: "http://localhost:3000",
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        testIsolation: false,
        defaultCommandTimeout: 10000,
        experimentalRunAllSpecs: true,
        video: false,
    },

    component: {
        devServer: {
            framework: "next",
            bundler: "webpack",
        },
    },
});
