<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import "aos/dist/aos.css";
    import MainHeader from "$lib/components/mainHeader.svelte";
  import { fade } from "svelte/transition";

  let { children } = $props();

</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

  <MainHeader />

<div
  in:fade={{ duration: 300, delay: 300 }}
  out:fade={{ duration: 300, }}
   >
  {@render children?.()}
</div>