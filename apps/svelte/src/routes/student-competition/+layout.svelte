<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import "aos/dist/aos.css";
  import MainHeader from "$lib/components/mainHeader.svelte";
  import { fade } from "svelte/transition";

  let { children } = $props();
</script>

<title>Heritage | Student Competition</title>
<meta name="description" content={``} />

<meta property="og:title" content={"Student Competition"} />
<!-- <meta property="og:image" content={"article.cover?.url"} /> -->

<MainHeader />
<div
  class="h-screen bg-[#F6EFE5] bg-[url('/assets/images/site-detail/detailed_site_bg_1.png')] flex flex-col bg-cover"
>
  <div
    class="w-full h-[30%] bg-white/50 bg-[url('/assets/images/landing/landing.png')] relative bg-center"
  >
    <img
      class="absolute block h-[11vh] w-full bottom-[-4.5vh] z-50"
      src="/assets/images/ripped_paper_horizontal.png"
      alt=""
    />
    <div
      class="size-full flex items-center md:pt-0 px-0 pl-[20px] lg:px-[6rem] lg:pl-[30px] text-white"
    >
      <div class="w-full">
        <h1
          class="mt-[3rem] font-bold font-averia text-[30px] lg:text-[64px] leading-[40px] mb-2 uppercase text-center md:text-left"
        >
          {"STUDENT COMPETITION"}
        </h1>
      </div>
    </div>
  </div>
  <div class="w-full h-[70%] flex-1 overflow-y-auto">
    <div class="w-full h-fit">

        {@render children?.()}
   
    </div>
  </div>
</div>
