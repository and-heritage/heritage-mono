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

  class="h-screen bg-[#F6EFE5] bg-[url('/assets/images/site-detail/detailed_site_bg_1.png')] flex flex-col md:flex-row bg-cover"
>
  <div
    class="w-full h-[40%] md:h-[12rem] bg-white/50 bg-[url('/assets/images/landing/landing.png')] relative md:w-[40%] md:h-full"
  >
    <img
      class="absolute hidden h-full w-[4vw] -right-[2vw] md:block"
      src="/assets/images/ripped_paper.png"
      alt=""
    />
    <img
      class="absolute block h-[4vh] w-full bottom-[-1.5vh] md:hidden z-50"
      src="/assets/images/ripped_paper_horizontal.png"
      alt=""
    />
    <div
      class="size-full flex items-center justify-center text-center md:text-left  md:pt-0 px-0 md:pl-[20px] md:px-[2rem] lg:px-[30px] text-white"
    >
      <div>
        <h1 class="mt-[3rem] font-bold font-averia text-[20px] lg:text-[64px] lg:leading-20 mb-2 uppercase">{title || 'Single Page'}</h1>
        {#if desc}
        <p class="hidden md:block font-normal text-[20px]">
          {desc || 'This is a single page layout. You can use this layout to display a single page of content. You can also use this layout to display a single page of content with a sidebar.'}
        </p>
        {/if}
      </div>
    </div>
  </div>
  <div
    class="w-full flex-1 md:w-[60%] px-[30px] py-[30px] lg:px-[6rem] md:py-[6rem] pr-[20px] md:pr-[30px] overflow-y-auto"
  >
    <div class="size-full">
      {#if children}
        {@render children()}
      {/if}
    </div>
  </div>
</div>
