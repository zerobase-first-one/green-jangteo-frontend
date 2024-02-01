import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react()],
  // define: {
  //   global: {},
  // },

  plugins: [react()],
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
  define: { _global: {} },
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
    },
  },
  build: {
    commonjsOptions: {
      // include: [],
      include: [/node_modules/],
      extensions: ['.js', '.cjs'],
      strictRequires: true,
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
      },
    },
    //   commonjsOptions: { include: [] },
  },
  // optimizeDeps: {
  //   disabled: false,
  // },
});
