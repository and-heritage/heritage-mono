<script lang="ts">
  import { tutorialState } from "$lib/state/popUpState.svelte";
  import { fade } from "svelte/transition";
  import MainButton from "./mainButton.svelte";
  import { register } from "swiper/element/bundle";
  import { d } from "$lib/utils/DelayHelper";

  register();
  let activeIndex = $state(0);
  let swiperEl: any;
  const totalSlides = [0, 1, 2];
  function initSwiper(node: HTMLElement) {
    swiperEl = node;
    const swiperParams = {
      simulateTouch: false,
      allowTouchMove: false,
      slidesPerView: 1,
      loop: false,

      // pagination: {
      //   clickable: true,
      // },
      //   navigation: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      on: {
        init: function (swiper: any) {
          triggerAos(swiper);
        },
        slideChangeTransitionStart: function (swiper: any) {
          resetAos(swiper);
        },
        slideChangeTransitionEnd: function (swiper: any) {
          triggerAos(swiper);
        },
        slideChange: (s: any) => {
          activeIndex = s.activeIndex;
        },
      },
    };

    Object.assign(node, swiperParams);
    // @ts-ignore
    node.initialize();
  }
  const next = () => swiperEl?.swiper.slideNext();
  const prev = () => swiperEl?.swiper.slidePrev();
  const goTo = (index: number) => swiperEl?.swiper.slideTo(index);

  function triggerAos(swiper: any) {
    const activeSlide = swiper.slides[swiper.activeIndex];
    const aosElements = activeSlide.querySelectorAll("[data-aos]");

    aosElements.forEach((el: Element) => {
      (el as HTMLElement).classList.add("aos-animate");
    });
  }

  function resetAos(swiper: any) {
    swiper.slides.forEach((slide: HTMLElement) => {
      const aosElements = slide.querySelectorAll("[data-aos]");
      aosElements.forEach((el: Element) => {
        (el as HTMLElement).classList.remove("aos-animate");
      });
    });
  }
</script>

{#if tutorialState.isOpen}
  <div
    transition:fade={{ duration: 400 }}
    class="fixed z-[9999] top-0 right-0 w-dvw h-dvh bg-[#120D0D]/70 flex items-center justify-center backdrop-blur-lg"
  >
    <div
      transition:fade={{ duration: 400 }}
      class="
        relative w-full
        max-w-[380px] md:max-w-[700px] lg:max-w-[1000px]
        aspect-[350/620] md:aspect-[800/480] lg:aspect-[1126/680]
        overflow-hidden
        mt-15

      "
    >
      <img
        class="block absolute md:hidden -z-20 top-0"
        src="/assets/images/paper_card_mobile.svg"
        alt=""
      />
      <img
        class="hidden absolute md:block -z-20 top-0"
        src="/assets/images/paper_card.svg"
        alt=""
      />
      <div
        class="flex flex-col justify-start md:justify-center h-full pt-[100px] lg:pt-[150px] px-5 md:px-[80px] lg:px-[120px]"
      >
        <div class="absolute right-3 top-3 md:right-[30px] md:top-[30px] lg:right-[40px] lg:top-[40px]">
          <MainButton
            square
            onclick={() => {
              swiperEl.swiper.slideTo(0);
              tutorialState.close();
            }}
            color="brown"
          >
            <span class="material-symbols-outlined"> close </span>
          </MainButton>
        </div>
        <div class="flex flex-col items-center gap-1">
          <h1
            class="text-[36px] lg:text-[49px] italic text-main-brown font-averia"
          >
            Tutorial
          </h1>
        </div>
        <hr />
        <!-- nav buttons -->
        <button
          onclick={next}
          class={`z-50 cursor-pointer absolute right-0 md:right-[30px] top-1/2 -translate-y-1/2  
          ${activeIndex === totalSlides.length - 1 ? "pointer-events-none text-gray-300" : "text-main-brown"}
          `}
        >
          <span class="text-[60px]! material-symbols-rounded">
            chevron_right
          </span>
        </button>
        <button
          onclick={prev}
          class={`z-50 cursor-pointer absolute left-0 md:left-[30px] top-1/2 -translate-y-1/2 
            ${activeIndex === 0 ? "pointer-events-none text-gray-300" : "text-main-brown"}
          `}
        >
          <span class="text-[60px]! material-symbols-rounded">
            chevron_left
          </span>
        </button>
        <div class="flex flex-col items-center gap-1 justify-start h-full">
          <swiper-container
            class="w-full flex flex-col grow"
            init="false"
            use:initSwiper
          >
            <!-- slide -->
            <swiper-slide
              class="relative flex flex-col h-full justify-start mt-5 gap-5 items-center"
            >
              <p
                class="text-center"
                data-aos-delay={`${d(0)}`}
                data-aos="fade-in"
              >
                Kindly look through the tutorial before proceeding to explore
                the heritage trail
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
            <!-- slide -->

            <swiper-slide
              class="relative flex flex-col h-fit justify-start mt-5 gap-5 items-center"
            >
              <p
                class="text-center"
                data-aos-delay={`${d(0)}`}
                data-aos="fade-in"
              >
                For desktop users, click and drag to explore each topic. Use
                your scroll wheel to zoom in.
              </p>
              <!-- desktop -->
              <div
                class=" w-full justify-center hidden md:flex"
                data-aos="fade-in"
                data-aos-delay={`${d(1)}`}
              >
                <img
                  class="w-30 lg:w-50"
                  src="/assets/images/tutorial/tutorial_mouse_drag.svg"
                  alt=""
                />
              </div>
              <!-- mobile -->
              <div class="flex md:hidden w-full flex-wrap justify-center gap-3">
                <div
                  class="flex flex-col items-center w-[200px] gap-5 text-center"
                  data-aos="fade-in"
                  data-aos-delay={`${d(1)}`}
                >
                  <img
                    src="/assets/images/tutorial/tutorial_rotate_mobile_1.svg"
                    alt=""
                  />
                  Rotate your device to view the heritage trail in landscape format
                </div>
                <div
                  class="flex flex-col items-center w-[200px] gap-5"
                  data-aos="fade-in"
                  data-aos-delay={`${d(2)}`}
                >
                  <img
                    src="/assets/images/tutorial/tutorial_rotate_mobile_2.svg"
                    alt=""
                  />
                  Pinch to zoom in or out
                </div>
              </div>
            </swiper-slide>
            <swiper-slide
              class="relative flex flex-col h-fit justify-start mt-5 gap-5 items-center"
            >
              <p
                class="text-center"
                data-aos-delay={`${d(0)}`}
                data-aos="fade-in"
              >
                Click the red location button to view detailed information.
              </p>
              <div class="flex w-full flex-wrap justify-center gap-10">
                <div
                  class="flex flex-col items-center w-[200px] gap-5"
                  data-aos="fade-in"
                  data-aos-delay={`${d(1)}`}
                >
                  <img
                    src="/assets/images/tutorial/tutorial_point.png"
                    alt=""
                  />
                  Started Button
                </div>
                <div
                  class="flex flex-col items-center w-[200px] gap-5"
                  data-aos="fade-in"
                  data-aos-delay={`${d(2)}`}
                >
                  <img
                    src="/assets/images/tutorial/tutorial_point_active.png"
                    alt=""
                  />
                  Hover Button
                </div>
              </div>
            </swiper-slide>

            <!-- pagination -->
            <div
              class="flex justify-center gap-2 absolute bottom-10 left-0 right-0"
            >
              {#each totalSlides as i}
                <button
                  onclick={() => goTo(i)}
                  class="h-2 w-8 cursor-pointer rounded-full hovered {activeIndex ===
                  i
                    ? 'bg-main-yellow'
                    : 'bg-gray-300 hover:bg-main-yellow/70'}"
                ></button>
              {/each}
            </div>
          </swiper-container>
        </div>
      </div>
    </div>
  </div>
{/if}
