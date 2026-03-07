<script lang="ts">
  import MainButton from "$lib/components/mainButton.svelte";
  import { fade } from "svelte/transition";

  // Horizontal Scroll Handling
  // function transformScroll(node: HTMLElement) {
  //   const onWheel = (e: WheelEvent) => {
  //     if (e.deltaY === 0) return;
  //     e.preventDefault();
  //     node.scrollLeft += e.deltaY * 1.5;
  //   };
  //   node.addEventListener("wheel", onWheel, { passive: false });

  //   return {
  //     destroy() {
  //       node.removeEventListener("wheel", onWheel);
  //     },
  //   };
  // }
  const LinesAmount = 15;
</script>

<div
  class="w-screen h-screen bg-[url('/assets/images/site-detail/hero.png')] bg-cover bg-center scroll-smooth overflow-x-hidden"
>
  <div class="w-full scroll-smooth">
    <!-- hero -->
    <section
      class=" relative w-full h-screen flex items-end text-white text-shadow-[1px_1px_10px_rgb(0_0_0_/1)] font-averia font-bold italic"
    >
      <div
        class="absolute w-full bg-linear-to-t from-black to-transparent h-full -bottom-[20vh]"
      ></div>
      <!-- Scroll Icon -->
      <div
        class="cursor-pointer absolute flex flex-col items-center justify-center w-[10dvw] text-shadow-none z-50 text-main-brown left-1/2 -translate-x-1/2 bottom-[4vh] group"
      >
        <span class="text-[2.2vh] font-poppins font-normal not-italic">
          Scroll
        </span>
        <img
          src="/assets/icons/arrow.svg"
          class="rotate-75 w-[5dvw] group-hover:translate-y-1 hovered"
          alt=""
        />
      </div>
      <div class="max-w-[150rem] w-full mx-auto">
        <div
          class=" w-full px-[80px] pb-[20vh] leading-[80px]"
          data-aos="fade-right"
        >
          <h1 class="w-[800px] text-[70px]">
            Court of Judicature at Maxwell’s House
          </h1>
          <h2 class=" text-[32px]">The First Official Courthouse</h2>
        </div>
      </div>
    </section>
    <!-- CONTENT WRAPPER -->
    <section
      class="relative w-full h-[100dvh] flex items-center justify-center text-white"
    >
      <!-- Rounded ornament -->
      <div
        class="absolute left-1/2 -translate-x-1/2 bottom-[-10dvh] w-[150vw] h-[130dvh] bg-[#F6EFE5] rounded-t-[100%] bg-[url('/assets/images/site-detail/detailed_site_bg_1.png')] bg-cover bg-top bg-no-repeat"
      ></div>
      <div
        class="relative w-full max-w-[40rem] h-full max-h-[40rem] -translate-y-1 overflow-hidden"
      >
        <img
          class="absolute -z-1 w-full object-cover object-top"
          src="/assets/images/site-detail/paper_card.svg"
          alt=""
        />
        <!-- paper line -->
        <div
          class="absolute w-full translate-y-[82px] pointer-events-none px-[48px]"
        >
          {#each Array(LinesAmount) as _}
            <div class="paper-line"></div>
          {/each}
        </div>
        <div class="size-full pt-[5rem] px-[50px]">
          <div class="w-full flex flex-col items-center justify-center">
            <!-- Hero  -->
            <div
              class={`bg-[#F1F1F1] w-[310px]  z-10 p-2 pb-4 relative shadow-2xl transition-all ease-in-out duration-200 -translate-y-0`}
            >
              <img
                src="/assets/images/site-detail/hero.png"
                class="w-full h-45"
                alt=""
              />
            </div>
          </div>
          <div class="">
            <!-- Paper Text -->
            <div class="paper-text">
              Location <span> : 1 Old Parliament Lane, Singapore 179429. </span>
            </div>
            <div class="paper-text">
              Completion <span> : 1827 </span>
            </div>
            <div class="paper-text">
              Architect <span> : George Drumgold Coleman </span>
            </div>
            <div class="paper-text">
              Years of Use <span> : 1828-1839, 1849-1868, 1875-1939 </span>
            </div>
            <div class="paper-text">
              Name Today <span> : Arts House at the Old Parliament </span>
            </div>
            <div class="paper-text">
              <div class="text-nowrap">Other Historical Names</div>
              <span>
                : Maxwell’s House, Assembly House, Parliament House, Parliament
                House
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
      class="relative w-full min-h-dvh h-full bg-[url('/assets/images/site-detail/map_bg_2.png')] bg-cover"
    >
      <!-- ornaments -->
      <img
        src="/assets/images/site-detail/yellow_string.svg"
        alt=""
        class="absolute top-[2dvh] right-[-10dvw] w-[30dvw]"
      />
      <img
        src="/assets/images/ripped_paper_horizontal.png"
        alt=""
        class="absolute top-[-9dvh] w-dvw"
      />
      <img
        src="/assets/images/site-detail/yellow_string.svg"
        alt=""
        class="absolute bottom-[5dvh] left-[-15dvw] w-[30dvw] rotate-180"
      />

      <!-- ornaments -->

      <!-- content -->
      <div
        class="max-w-[150rem] w-full h-full mx-auto px-[80px] py-[10dvh] text-white"
      >
        <div class="w-1/2 border-b border-white py-5">
          <h1 class="font-averia font-bold text-[48px] italic">
            A Green Corner with Its Own Story
          </h1>
        </div>
        <div class="columns-1 md:columns-2 gap-[200px] text-start py-5">
          <p class="mb-4">
            The building at 1 Old Parliament Lane was the site of the first
            Court of Judicature for Singapore from 1828 to 1839. Prior to that,
            court sessions were held in various other unofficial locations
            around Singapore. The first session of the Court of Judicature in
            the building took place on 18 May 1828.
          </p>
          <p class="mb-4">
            The building at 1 Old Parliament Lane was the site of the first
            Court of Judicature for Singapore from 1828 to 1839. Prior to that,
            court sessions were held in various other unofficial locations
            around Singapore. The first session of the Court of Judicature in
            the building took place on 18 May 1828. It was designed in 1826 by
            prominent architect George Drumgold Coleman in the typical British
            colonial architecture of the nineteenth century. It was an elegant
            building built in Neo Palladian style in two colours with timber
            shutters supported by Doric columns and pilaster. When it was built,
            it was intended as a home for John Argyle Maxwell, a Scottish
            merchant and appointed magistrate in Singapore. However, he never
            lived there and rented it to the Straits Settlements in 1827,
            eventually selling it to the government in 1841. In its early years,
            the building continued to be known as Maxwell’s House.
          </p>
          <p class="mb-4">
            In 1839, the Court of Judicature moved to a shed-like annexe of
            Maxwell’s House, while the main building was repurposed for other
            government offices. As the annexe was unsuitable
          </p>
          <p class="mb-4">
            for court functions due to the noise from the neighbouring shipyard,
            the court moved back into the main building in 1849. Nevertheless,
            by 1872, the Straits Times noted that Maxwell’s House was also
            ill-suited for court purposes as it was designed to be a private
            residence:
          </p>

          <blockquote class="break-inside-avoid text-main-yellow italic">
            (There was) not a room in it sufficiently large for a court hall…
            (the cramped space resulted in) constant confusion and elbowing
            through the crowd in all directions… the judge’s Bench (was) placed
            across the front of the room, with a large open veranda at his back…
            during the… monsoon, a constant strong breeze (coursed) through the
            room, which (would set) all the papers into confusion
          </blockquote>
          <div class="w-full h-50 flex justify-center break-inside-avoid">
            <img
              class="h-full"
              src="/assets/images/site-detail/building_outlined.png"
              alt=""
            />
          </div>
        </div>
      </div>

      <!-- content -->
    </section>

    <section
      class="relative w-full flex bg-[#F6EFE5] min-h-[60rem] h-full bg-[url('/assets/images/site-detail/detailed_site_bg_1.png')] bg-cover bg-center"
    >
      <!-- ornaments -->
      <img
        src="/assets/images/ripped_paper_horizontal.png"
        alt=""
        class="absolute top-[-9dvh] w-dvw"
      />

      <!-- content -->
      <div
        class="relative max-w-[50rem] w-full h-fit m-auto px-[80px] text-secondary text-[18px]"
      >
        <img
          src="/assets/images/site-detail/singapore_heritage.svg"
          alt=""
          class="absolute top-[-8rem] left-[-8rem] w-30 -rotate-12"
        />
        <p class="mb-4">
          Notwithstanding these limitations, after the court moved briefly to
          Empress Place Building in 1868 when it was reconstituted the Supreme
          Court of the Straits Settlements, it returned to Maxwell’s House in
          1875. It remained here until its move to the newly built Supreme Court
          building at the junction of St Andrew’s Road and High Street in 1939.
          Following its move, the building served many uses as government
          offices, with several extensions and renovations made over the years.
          It was renovated for use by the Legislative Assembly as the Assembly
          House in 1954. When Singapore gained independence in 1965, the
          building was renamed Parliament House and used by the Parliament of
          Singapore until 1999 when a new Parliament Complex was completed. In
          1992, the building was gazetted a National Monument. In 2004, after a
          four-year restoration, it reopened as a multicultural arts and
          heritage centre called The Arts House at the Old Parliament, owned by
          the National Arts Council.
        </p>
      </div>
    </section>
    <!-- Quiz -->
    <section
      class="relative w-full max-h-[100rem] overflow-hidden pb-[20dvh] h-full bg-[url('/assets/images/site-detail/map_bg_2.png')] bg-cover"
    >
      <!-- ornaments -->
      <img
        src="/assets/images/ripped_paper_horizontal.png"
        alt=""
        class="absolute top-[-9dvh] w-dvw"
      />
      <div
        class="absolute left-1/2 -translate-x-1/2 bottom-[-110dvh] w-[150vw] h-[130dvh] bg-[#F6EFE5] rounded-t-[100%] bg-[url('/assets/images/site-detail/detailed_site_bg_1.png')] bg-cover bg-top bg-no-repeat"
      ></div>
      <a
      href="/explore"
        class="cursor-pointer absolute flex flex-col items-center justify-center w-[10dvw] text-shadow-none z-50 text-main-brown left-1/2 -translate-x-1/2 bottom-[4vh] group"
      >
        <span class="text-[2.2vh] font-poppins font-normal not-italic">
          Back to Map
        </span>
        <img
          src="/assets/icons/arrow.svg"
          class="rotate-0 -scale-x-[1] w-[3dvw] group-hover:-translate-x-1 hovered"
          alt=""
        />
      </a>

      <!-- ornaments -->

      <!-- content -->
      <div
        class="max-w-[80rem] w-full h-full mx-auto px-[80px] py-[10dvh] text-white"
      >
        <div class="flex w-full h-full items-center gap-[70px]">
          <div class="w-[348px] h-[500px] overflow-hidden rounded-2xl">
            <!-- Quiz Image -->
            <img
              src="/assets/images/site-detail/hero.png"
              alt=""
              class="size-full object-cover"
            />
          </div>
          <!-- Quiz title -->
          <div class="flex flex-col gap-5">
            <div class="font-bold font-averia">
              <h2 class="text-[32px]">QUESTION 1</h2>
              <h1 class="text-[48px]">
                What was the primary function of Maxwell’s House?
              </h1>
            </div>
            <!-- Quiz Questions -->
            <div class="grid grid-cols-2 grid-rows-2 gap-x-5 gap-y-3">
              <button
                class="border border-white rounded-xl bg-white/20 p-2 hover:bg-white/50 hovered cursor-pointer"
                >A. Residential building</button
              >
              <button
                class="border border-white rounded-xl bg-white/20 p-2 hover:bg-white/50 hovered cursor-pointer"
                >B. Commercial offices</button
              >
              <button
                class="border border-white rounded-xl bg-white/20 p-2 hover:bg-white/50 hovered cursor-pointer"
                >C. Judicial and court related</button
              >
              <button
                class="border border-white rounded-xl bg-white/20 p-2 hover:bg-white/50 hovered cursor-pointer"
                >D. Military headquarters</button
              >
            </div>
            <div class="flex justify-start">
              <MainButton color="white">Next Questions</MainButton>
            </div>
          </div>
        </div>
      </div>

      <!-- content -->
    </section>
  </div>
</div>

<style>
  /* Hiding Scrollbar */
  /* .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  } */
</style>
