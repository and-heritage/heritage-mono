<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import "aos/dist/aos.css";
  import MainHeader from "$lib/components/mainHeader.svelte";
  import SplitPaperLayout from "$lib/components/layouts/SplitPaperLayout.svelte";

  let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<MainHeader />
<SplitPaperLayout title="Guided Tour" desc="Embark on an unforgettable journey of discovery, history, and heritage—led by our knowledgeable and friendly guides." >
    {@render children?.()}
</SplitPaperLayout>


