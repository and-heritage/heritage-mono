<script>
  import { fly, fade } from "svelte/transition";
  import MainButton from "./mainButton.svelte";
  import MainMenuItem from "./MainMenuItem.svelte";
  import herritage from "$lib/assets/images/herritage_2.png";
  import national_board from "$lib/assets/images/national_board.png";
  import { menuState } from "$lib/state/popUpState.svelte";
</script>

{#if menuState.isOpen}
  <div
    transition:fade={{ duration: 400 }}
    class="fixed z-[999999999999] top-0 right-0 size-full bg-[#290E08]/70 flex flex-row-reverse backdrop-blur-lg"
  >
    <div
      transition:fly={{ duration: 300, x: 200 }}
      class="w-full h-full bg-white/50 relative md:w-1/2"
      style="background-image: url('/assets/images/landing/landing.png')"
    >
      <img
        class="absolute hidden h-full w-[4vw] -left-[2vw] md:block "
        src="/assets/images/ripped_paper.png"
        alt=""
      />
      <div class="flex flex-col h-full justify-between px-[20px] py-5 gap-5 md:py-[50px] md:px-[60px]" >
        <div class="w-full flex justify-between md:justify-end " >
          <img
            class=" block h-full w-30 md:hidden"
            src="/assets/images/sglaw.svg"
            alt=""
          />
          <MainButton square onclick={() => menuState.close()} color="white">
            <span class="material-symbols-outlined"> close </span>
          </MainButton>
        </div>
        <div class="flex flex-col gap-2 font-averia text-[36px] md:text-[50px] md:gap-5 ">
          <MainMenuItem no="01" text="EXPLORE TRAIL" href="/explore" />
          <MainMenuItem no="02" text="GUIDED TOUR" href="/guided-tour" />
          <MainMenuItem no="03" text="ROVING EXHIBITION" href="/roving-exhibition" />
          <MainMenuItem no="04" text="STUDENT COMPETITION" href="/student-competition" />
          <MainMenuItem no="05" text="QUIZ" href="/quiz" />
        </div>
        <!-- footer -->
        <div class="text-white w-full flex flex-col gap-10 flex-wrap mt-5 md:flex-row" >
          <!-- address -->
          <div class="w-full text-[18px] shrink">
            <p>150 Beach Road #02-01</p>
            <p class="mb-5">Gateway West</p>
            <p>Singapore 189720</p>
          </div>
          <!-- social -->
          <div class="flex items-end gap-6 grow justify-start">
            <img src="/assets/socials/facebook.svg" alt="" class="h-7" />
            <img src="/assets/socials/instagram.svg" alt="" class="h-7" />
            <img src="/assets/socials/x.svg" alt="" class="h-7" />
            <img src="/assets/socials/linkedin.svg" alt="" class="h-7" />
          </div>
          <!-- logo -->
          <div class="w- flex items-end justify-start gap-5 grow md:justify-end">
            <img src={herritage} alt="" class="h-12" />
            <img src={national_board} alt="" class="h-12" />
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
