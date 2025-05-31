import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Create a chunk for react-router-dom and react-dom as they are likely large
          if (id.includes('react-router-dom') || id.includes('react-dom')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
          // Create a chunk for lucide-react icons
          if (id.includes('lucide-react')) {
            return 'lucide-icons';
          }
          // shadcn-ui components are numerous, let's try to bundle them together
          // This might need refinement based on actual component usage and size
          if (id.includes('@radix-ui') || id.includes('cmdk') || id.includes('embla-carousel-react') || id.includes('input-otp') || id.includes('next-themes') || id.includes('recharts') || id.includes('sonner') || id.includes('vaul')) {
            return 'shadcn-ui-vendors';
          }
        }
      }
    }
  }
}));
