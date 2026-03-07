<script lang="ts">
  import TrailMap from "$lib/components/trailMap.svelte";
  import Tutorial from "$lib/components/Tutorial.svelte";
</script>

<div
  id="trailMap"
  class="h-screen w-screen relative flex flex-col items-stretch justify-start overflow-hidden"
>
  <TrailMap />
  <Tutorial/>
</div>
