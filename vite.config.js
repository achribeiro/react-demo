import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Configuração para reduzir avisos de source map
  build: {
    sourcemap: false, // Desabilita source maps em produção para evitar erros
  },
});
