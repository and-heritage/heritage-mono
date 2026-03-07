// import adapter from '@sveltejs/adapter-static';

import adapter from '@sveltejs/adapter-auto'; 

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  // Static
  // kit: {
  //   adapter: adapter({
  //     pages: "build",
  //     assets: "build",
  //     fallback: undefined,
  //     // fallback: "index.html",
  //     precompress: false,
  //     strict: true
  //   })
  // }
  // Auto
  kit: {
    adapter: adapter()
  }
};

export default config;
