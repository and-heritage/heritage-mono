<script lang="ts">
  import { d } from "$lib/utils/DelayHelper";
  import MainButton from "$lib/components/mainButton.svelte";
</script>

<swiper-slide
  class="relative flex flex-col h-fit justify-start mt-5 gap-5 items-center"
>
  <p
    class="text-center text-[12px] lg:text-[16px]"
    data-aos-delay={`${d(0)}`}
    data-aos="fade-in"
  >
    Kindly look through the tutorial before proceeding to explore the heritage
    trail
  </p>
  <div
    class="flex w-full justify-center gap-x-[100px] gap-y-[10px] lg:gap-x-[120px] flex-wrap"
  >
    <div
      class="flex flex-col items-center w-[50px] gap-5"
      data-aos="fade-in"
      data-aos-delay={`${d(1)}`}
    >
      <MainButton square color="white">
        <span class="material-symbols-outlined"> volume_up </span>
      </MainButton>
      <p class="w-[150px] text-center">Sound On / Off Button</p>
    </div>
    <div
      class="flex flex-col items-center w-[50px] gap-5"
      data-aos="fade-in"
      data-aos-delay={`${d(2)}`}
    >
      <MainButton square color="white">
        <span class="material-symbols-outlined"> refresh </span>
      </MainButton>
      <p class="w-[150px] text-center text-wrap">Reset Position</p>
    </div>
    <div
      class="flex flex-col items-center w-[50px] gap-5"
      data-aos="fade-in"
      data-aos-delay={`${d(3)}`}
    >
      <MainButton square color="white">
        <span class="material-symbols-outlined"> refresh </span>
      </MainButton>
      <p class="w-[150px] text-center">Zoom In</p>
    </div>
    <div
      class="flex flex-col items-center w-[50px] gap-5"
      data-aos="fade-in"
      data-aos-delay={`${d(4)}`}
    >
      <MainButton square color="white">
        <span class="material-symbols-outlined"> refresh </span>
      </MainButton>
      <p class="w-[150px] text-center">Zoom Out</p>
    </div>
  </div>
</swiper-slide>
