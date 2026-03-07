<script lang="ts">
  import miniaw from "$lib/assets/images/minlaw.png";
  import background from "$lib/assets/images/landing.png";
  import StickyNotesCard from "$lib/components/landing/stickyNotesCard.svelte";
  import { d } from "$lib/utils/DelayHelper";
  import { fade } from "svelte/transition";


</script>

<svelte:head>
    <title>Heritage</title>
    <meta property="og:title" content='Heritage' />
    <meta name="description" content='Discover the evolution of Singapore’s legal landscape at the MinLaw Bicentennial 2026 website. Experience virtual heritage stops, engage with roving exhibition content, and learn about the institutions that have upheld justice and progress for two centuries.'/>
    <meta property="og:image" content='/assets/images/meta/landing.png' />
</svelte:head>

<div
  in:fade={{ duration: 300, delay: 300 }}
  out:fade={{ duration: 300, }}
  class="bg-amber-200 flex w-full h-dvh bg-cover bg-center overflow-x-hidden"
  style="background-image: url('{background}')"
>
  <div
    class="max-w-[30rem] flex flex-col gap-10 w-full h-fit p-3 overflow-hidden
  md:max-w-[90rem]  m-auto "
  >
    <div
    id="a"
      class="flex flex-col justify-center items-center w-full text-center text-white"
    >
      <img src={miniaw} alt="" class="w-32 md:w-44" data-aos="fade-down" data-aos-anchor="a"/>
      <div data-aos="fade-in" data-aos-delay={d(0)} data-aos-anchor="a">
        <h1
          class="font-averia text-[42px] md:text-[68px] font-bold italic leading-tight
          md:text-[36px]
          ">
          Explore Our Heritage Trail
        </h1>
        <p class="text-[18px] md:text-[24px] mt-2 px-2">
          Tap, explore, and uncover heritage stops, secret histories, and
          surprises along the way.
        </p>
      </div>
    </div>
    <!-- Cards -->
    <div
      class="flex flex-col md:flex-row items-center w-full relative grow gap-x-5 gap-y-14  flex-wrap justify-center group isolate my-10 md:my-0"
    >
      <StickyNotesCard
        aosDelay={d(1)}
        text="Explore Trail"
        href="/explore"
        img="/assets/images/landing/explore_trail.png"
        class="rotate-6 md:-translate-y-5 md:hover:translate-x-10 md:hover:translate-y-5"
      />
      <StickyNotesCard
        aosDelay={d(2)}
        text="Guided Tour"
        href="/guided-tour"
        img="/assets/images/landing/guided_tour.png"
        class="-rotate-6 md:translate-y-5"
      />
      <StickyNotesCard
        aosDelay={d(3)}
        text="Roving Exhibition"
        href="/roving-exhibition"
        img="/assets/images/landing/roving_exhibition.png"
        class="rotate-6 md:translate-y-15"
      />
      <StickyNotesCard
        aosDelay={d(4)}
        text="Student Competition"
        href="/student-competition"
        img="/assets/images/landing/student_competition.png"
        class="-rotate-6 md:translate-y-5"
      />
      <StickyNotesCard
        aosDelay={d(5)}
        text="Quiz"
        href="/quiz"
        img="/assets/images/landing/quiz.png"
        class=" rotate-6 md:rotate-0 md:-translate-y-5 md:hover:-translate-x-10 md:hover:translate-y-5"
      />
    </div>
    <!-- footer -->
    <div
      class="text-white w-full flex flex-col gap-8 items-center justify-between 
      md:pb-0 md:flex-row md:gap-5 md:items-end
      ">
      <div
        class="text-[16px] md:text-[18px] text-center md:text-left"
        data-aos="fade-right"
        data-aos-anchor="#aos-trigger"
      >
        <p>150 Beach Road #02-01</p>
        <p class="mb-5">Gateway West</p>
        <p>Singapore 189720</p>
      </div>

      <div
        class="flex items-end gap-6  justify-center"
        data-aos="fade-up"
        data-aos-delay={d(7)}
        data-aos-anchor="#aos-trigger"
      >
        <img src="/assets/socials/facebook.svg" alt="" class="h-7" />
        <img src="/assets/socials/instagram.svg" alt="" class="h-7" />
        <img src="/assets/socials/x.svg" alt="" class="h-7" />
        <img src="/assets/socials/linkedin.svg" alt="" class="h-7" />
      </div>

      <!-- <div
        class=" p-5 flex items-end justify-end gap-5"
        data-aos="fade-left"
        data-aos-delay={d(8)}
        data-aos-offset="0"
        data-aos-anchor="#trigger-utama"
      >
        <img src={herritage} alt="" class="h-10 md:h-12" />
        <img src={national_board} alt="" class="h-10 md:h-12" />
      </div> -->
    </div>
  </div>
</div>
