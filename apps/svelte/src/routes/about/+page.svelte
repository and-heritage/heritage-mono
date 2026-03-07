<script lang="ts">
  import { fade } from "svelte/transition";


</script>

<div in:fade={{ duration: 300, delay: 300 }} out:fade={{ duration: 300 }}>

</div>

<h1>Welcome to About page!</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
