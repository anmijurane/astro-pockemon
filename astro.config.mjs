import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000
  },
  integrations: [icon(), solidJs()]
});