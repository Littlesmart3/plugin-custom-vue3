import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { join } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import usePluginImport from 'vite-plugin-importer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [TDesignResolver({ library: 'vue-next' })],
    }),
    Components({
      resolvers: [TDesignResolver({ library: 'vue-next' })],
    }),
  ],
  base: './',
  resolve: {
    alias: [
      {
        find: /^@\//,
        replacement: join(__dirname, 'src/'),
      },
    ],
  },
});
