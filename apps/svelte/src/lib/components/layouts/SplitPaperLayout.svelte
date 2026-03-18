<script lang="ts">
  import type { Snippet } from "svelte";
    import { fade } from "svelte/transition";

  interface Props {
    title?: string;
    desc?: string;
    children?: Snippet;
  }
  let { children, title, desc }: Props = $props();
</script>

<div
  in:fade={{ duration: 300, delay: 300 }}
  out:fade={{ duration: 300, }}
  class="h-screen bg-main-dark flex flex-col md:flex-row"
>
  <div
    class="w-full h-[12rem] bg-main-dark-secondary relative md:w-[40%] md:h-full"
  >
    <!-- Night theme gradient accent -->
    <div
      class="absolute hidden h-full w-1 right-0 md:block bg-gradient-to-b from-main-accent via-main-accent-secondary to-main-gold"
    ></div>
    <div
      class="absolute block h-1 w-full bottom-0 md:hidden bg-gradient-to-r from-main-accent via-main-accent-secondary to-main-gold"
    ></div>
    <div
      class="size-full flex items-center md:pt-0 px-0 pl-[20px] lg:px-[6rem] lg:pl-[30px] text-white"
    >
      <div>
        <h1 class="mt-[3rem] font-bold font-averia text-[40px] lg:text-[64px] leading-20 mb-2 uppercase">{title || 'Single Page'}</h1>
        {#if desc}
        <p class="hidden md:block font-normal text-[20px] text-white/80">
          {desc || 'This is a single page layout. You can use this layout to display a single page of content. You can also use this layout to display a single page of content with a sidebar.'}
        </p>
        {/if}
      </div>
    </div>
  </div>
  <div
    class="w-full flex-1 md:w-[60%] px-[30px] py-[30px] lg:px-[6rem] md:py-[6rem] pr-[20px] md:pr-[30px] overflow-y-auto text-white"
  >
    <div class="size-full">
      {#if children}
        {@render children()}
      {/if}
    </div>
  </div>
</div>
