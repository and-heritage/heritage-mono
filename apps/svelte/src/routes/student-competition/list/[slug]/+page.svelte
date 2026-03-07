<script lang="ts">
import Modal from '$lib/components/modal/Modal.svelte';
    import { goto } from '$app/navigation';
  import CompetitionModal from '$lib/components/modal/CompetitionModal.svelte';

    let { data } = $props();
    let competition = $derived(data.data); 

    function handleClose() {
        goto('/student-competition/list/', { replaceState: true });
    }
</script>

<svelte:head>
    <title>{competition.title}</title>
    <meta name="description" content={`${competition.description}`} />
    
    <meta property="og:title" content={competition.title} />
    <!-- <meta property="og:image" content={article.cover?.url} /> -->
</svelte:head>

<Modal onClose={handleClose}>
    <CompetitionModal {competition}/>
</Modal>