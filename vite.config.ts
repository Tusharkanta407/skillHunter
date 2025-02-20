import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',  // Ensures correct asset paths for Netlify deployment
  server: {
    host: true,
    port: 5173
  },
  optimizeDeps: {
    include: ['@react-three/fiber', '@react-three/drei', 'three']
  }
});
