import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

declare const process: any;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const allowedHosts = env.VITE_ALLOWED_HOSTS === 'all'
    ? 'all'
    : env.VITE_ALLOWED_HOSTS?.split(',').map(h => h.trim());

  console.log(`--allowedHosts`, allowedHosts);

  return {
    plugins: [tailwindcss(), sveltekit()],
    server: {
      allowedHosts
    }
  } as any;
});
