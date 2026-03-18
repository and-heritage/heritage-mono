<script lang="ts">
  import Aos from "aos";
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import "aos/dist/aos.css";
  import { onMount } from "svelte";
  import MainMenu from "$lib/components/MainMenu.svelte";
  import MainHeader from "$lib/components/mainHeader.svelte";
  import { fade } from "svelte/transition";
  import { page } from "$app/state";
  let { children } = $props();
  onMount(() => {
    // Timeout dikit biar ga tabrakan sama loading gambar
    setTimeout(() => {
      Aos.init({
        mirror: true,
        once:false,

        throttleDelay: 50,
      });
    }, 100);
    console.log("Debug Tracking");
    return () => Aos.init();

  });

  $effect(() => {
    const _ = page.url.pathname; 
    
    setTimeout(() => {
      Aos.init(); 
    }, 100);
  });
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
/><link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Round|Material+Icons+Sharp|Material+Icons+Two+Tone" rel="stylesheet">
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Averia+Libre:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Caveat:wght@400..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap"
  rel="stylesheet"
/>
<MainHeader />
<MainMenu />

<div in:fade={{ duration: 300, delay: 300 }} out:fade={{ duration: 300 }}>
  {@render children?.()}
</div>
