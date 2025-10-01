import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  optimizeDeps: {
    include: ['bpmn-js/lib/Modeler', 'bpmn-js/lib/Viewer']
  },
  define: {
    global: 'globalThis'
  }
});

