<script lang="ts">
  import MapListCard from "$lib/components/cards/MapListCard.svelte";
  import SplitPaperLayout from "$lib/components/layouts/SplitPaperLayout.svelte";
  import MainHeader from "$lib/components/mainHeader.svelte";
  import { fade } from "svelte/transition";
</script>

<!-- Layout Component -->
<div in:fade={{ duration: 300, delay: 300 }} out:fade={{ duration: 300 }}>
  <MapListCard />
  <MapListCard />
  <MapListCard />
  <MapListCard />
</div>

<!-- Layout Component -->
