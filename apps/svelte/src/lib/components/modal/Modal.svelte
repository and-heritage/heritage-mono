<script lang="ts">
    import type { Snippet } from 'svelte';
	import { fade, fly } from 'svelte/transition';
  import MainButton from '../mainButton.svelte';
    let { children, onClose } = $props<{ 
        children: Snippet, 
        onClose: () => void 
    }>();

    function handleBackdropClick(e: MouseEvent) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }
    
    function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape') onClose();
    }
</script>

<svelte:window onkeydown={handleKeydown} />

<div 
    class="fixed w-screen h-[70%] z-11 flex items justify-  bg-[#F6EFE5] bg-[url('/assets/images/site-detail/detailed_site_bg_1.png')] flex-col bg-cover p-4 pt-0 overflow-y-auto"
    in:fly={{ y: 20, duration: 400 }}
    out:fly={{ y: 20, duration: 400 }}
>
    <div 
        class="relative w-full h-full "

    >
        <div class="flex justify-end absolute top-[20px] right-[20px] z-10">
            <!-- <button 
                onclick={onClose}
                class="bg-slate-800/80 hover:bg-red-500/80 text-white rounded-full p-2 transition-colors backdrop-blur-md cursor-pointer"
                aria-label="Close modal"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button> -->
            <MainButton square onclick={onClose} color='white'>
                <span class="material-symbols-outlined">close</span>
            </MainButton>
        </div>

        <div class="p-6 pt-0">
            {@render children?.()}
        </div>
    </div>
</div>