import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";

// export default defineConfig({
//   server: {
//     proxy: {
//       "/api": "https://green-jangteo.duckdns.org:8443",
//     },
//   },
//   plugins: [react()],
// });
