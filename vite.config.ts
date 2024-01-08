import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
  },

  // is not a constructor를 위해 추가한 코드
  build: {
    // commonjsOptions: { include: [] },
    minify: false,
  },
  // optimizeDeps: {
  //   disabled: false,
  // },
});
