import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return config;
    },
    baseUrl: 'https://api.hubapi.com',
    env: {
      HUBSPOT_ACCESS_TOKEN: process.env.HUBSPOT_ACCESS_TOKEN,
    },
    specPattern: 'cypress/e2e/**/*.cy.ts',
  },
});
