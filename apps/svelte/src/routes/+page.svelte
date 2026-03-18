<script lang="ts">
  import TrailMap from "$lib/components/trailMap.svelte";
  import Tutorial from "$lib/components/Tutorial.svelte";
</script>

<svelte:head>
  <title>Heritage Trail</title>
  <meta property="og:title" content='Heritage Trail' />
  <meta name="description" content="Explore the heritage trail and discover Singapore's legal history."/>
  <meta property="og:image" content='/assets/images/meta/landing.png' />
</svelte:head>

<div
  id="trailMap"
  class="h-screen w-screen relative flex flex-col items-stretch justify-start overflow-hidden"
>
  <TrailMap />
  <Tutorial/>
</div>
