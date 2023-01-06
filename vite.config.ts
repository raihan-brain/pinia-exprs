import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), mkcert()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // build: {
  //   outDir: "bs23",
  // },
  server: {
    https: true,
    host: "local.network.app",
    port: 8080,
    cors: false,
    hmr: {
      overlay: true,
    },
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
});
