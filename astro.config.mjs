import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  devToolbar: {
     enabled: false
  },
  integrations: [tailwind(), react()],
  output: "server",
  prefetch: true,
  adapter: vercel()
});