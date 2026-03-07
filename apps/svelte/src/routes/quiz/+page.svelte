<script lang="ts">
  import MainButton from "$lib/components/mainButton.svelte";
  import RoadSign from "$lib/components/RoadSign.svelte";
  import { fade } from "svelte/transition";
</script>

<div
  in:fade={{ duration: 300, delay: 300 }}
  out:fade={{ duration: 300 }}
  class="h-screen bg-[#F6EFE5] bg-[url('/assets/images/site-detail/detailed_site_bg_1.png')] flex flex-col-reverse md:flex-row bg-cover relative"
>
  <RoadSign
    class="bottom-[-15rem]  left-1/2 -translate-x-[180px] md:-translate-x-1/2 z-40 -rotate-6 scale-50 md:scale-70 lg:scale-100"
    text="TIONG BAHRU MARKET"
  />
      <div class="absolute bottom-0 z-10 left-0 w-full block md:hidden">
      <svg
        width="188"
        height="110"
        viewBox="0 0 188 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M185.21 112.753C182.751 91.386 172.289 70.9541 146.401 77.7256C120.513 84.4971 111.739 95.8329 89.0623 75.8337C66.3855 55.8344 66.8452 36.9769 82.4141 38.6424C97.9831 40.3079 110.843 77.194 77.3729 85.3696C43.9032 93.5452 25.5628 31.1064 4.45933 12.245C-16.6442 -6.61646 -43.0342 6.67956 -66.4413 12.5381C-74.8465 14.6419 -85.3152 16.1811 -96.0001 16.8258"
          stroke="#DFA67D"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dasharray="14 14"
        />
      </svg>
    </div>
  <!-- Section 1 -->
  <div
    class="w-full h-[65%] md:h-40 bg-white/50 bg-[url('/assets/images/landing/landing.png')] relative md:w-[50%] md:h-full"
  >
    <img
      class="absolute hidden h-full w-[4vw] -right-[2vw] md:block"
      src="/assets/images/ripped_paper.png"
      alt=""
    />
    <img
      class="absolute block h-[5vh] w-full top-[-3vh] md:hidden z-50"
      src="/assets/images/ripped_paper_horizontal.png"
      alt=""
    />
    <div
      class="size-full flex items-start md:items-center md:pt-0 px-0 px-[40px] lg:px-[6rem] lg:pl-[30px] text-white"
    >
      <div>
        <h1
          class="mt-[3rem] font-bold font-averia text-[40px] lg:text-[64px] leading-20 mb-2 uppercase"
        >
          QUIZ TIME
        </h1>
        <p class=" font-normal text-[20px] mb-2">
          How well do you know Tiong Bahru based on your experience?
        </p>
        <a href="/quiz/start">
          <MainButton color="white" class="w-full md:w-1/2 justify-between">
            Start Quiz
            <span class="material-symbols-outlined"> arrow_forward </span>
          </MainButton>
        </a>
      </div>
    </div>
  </div>
    <!-- Section 2 -->
  <div
    class="w-full flex-1 md:w-[50%] px-[10px] py-[30px] lg:px-[6rem] md:py-[6rem] pr-[20px] md:pr-[30px] overflow-hidden flex justify-center items-center"
  >
    <div class="w-fit flex flex-row-reverse md:flex-col justify-center">
      <div
        class={`bg-[#F1F1F1] md:w-[250px] lg:w-[400px] h-fit  z-10 p-1 pb-6 md:pb-15  relative shadow-2xl font-caveat font-bold rotate-8 md:rotate-8 -translate-y-10 md:translate-y-0 md:-translate-x-15`}
      >
        <img
          src="/assets/images/site-detail/hero.png"
          class="w-full object-cover"
          alt=""
        />
      </div>
      <div
        class={`bg-[#F1F1F1] relative md:w-[250px] lg:w-[400px]  h-fit  z-10 p-1 pb-6 md:pb-15  relative shadow-2xl font-caveat font-bold -rotate-10 md:-rotate-6 translate-y-10 md:translate-y-0 translate-x-6 md:translate-x-15`}
      >
        <img
          src="/assets/images/site-detail/hero.png"
          class="w-full object-cover"
          alt=""
        />
        <img
          class="w-[60px] absolute -top-[41px] right-0"
          src="/assets/images/pin.png"
          alt=""
        />
      </div>
    </div>
  </div>
</div>
