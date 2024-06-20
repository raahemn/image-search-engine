import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],

    server: {
        host: true, // This exposes the server to the network
        port: 3000, // Specify the port
        proxy: {
            // "/api": {
            //     target: "https://imsbackend-ujhoe434ua-uc.a.run.app/",
            //     changeOrigin: true,
            // },
            "/api": {
                target: "http://127.0.0.1:8000",
                changeOrigin: true,
            },
        },
    },
    optimizeDeps: {
        include: ["react", "react-dom"], // Include your main dependencies
    },
});
