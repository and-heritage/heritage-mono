<script lang="ts">
  import MainButton from "$lib/components/mainButton.svelte";
  import { fade } from "svelte/transition";
</script>

<!-- Layout Component -->

  <div class="flex flex-col-reverse lg:flex-row" in:fade={{ duration: 300, delay: 300 }} out:fade={{ duration: 300 }}>
    <div class="h-full lg:w-[40rem]">
      <div class="font-averia uppercase py-5 lg:py-0">
        <h1 class="font-bold italic text-[36px] lg:text-[48px] text-main-brown">
          Justice in Site
        </h1>
        <p class="font-light text-[20px] lg:text-[28px] leading-7 mb-5">
          Two Centuries of Progress through the Rule of Law
        </p>
      </div>
      <div class="lg:w-[27rem] h-full md:min-h-[18rem] bg-[url('/assets/images/paper_card.svg')] drop-shadow-2xl bg-cover bg-top-left bg-no-repeat font-poppins">
        <!-- <img
          class="w-full object-contain drop-shadow-2xl absolute hidden md:block"
          src="/assets/images/paper_card.svg"
          alt=""
        /> -->
        <div class="space-y-2 px-3 py-20  sm:pt-[70px] sm:pl-[45px]">
          <div class="flex gap-2">
            <div class="shrink flex gap-2 w-30">
              <span class="material-symbols-rounded"> location_on </span> Venue
            </div>
            :
            <div class="flex-1">Our Tampines Hub</div>
          </div>
          <div class="flex gap-2">
            <div class="shrink flex gap-2 w-30">
              <span class="material-symbols-rounded">
                confirmation_number
              </span> Admission
            </div>
            :
            <div class="flex-1">Free</div>
          </div>
          <div class="flex gap-2">
            <div class="shrink flex gap-2 w-30">
              <span class="material-symbols-rounded"> date_range </span> Date
            </div>
            :
            <div class="flex-1">12 - 30 September 2026</div>
          </div>
          <div class="flex gap-2">
            <div class="shrink flex gap-2 w-30">
              <span class="material-symbols-rounded"> schedule </span> Time
            </div>
            :
            <div class="flex-1">10:00am</div>
          </div>
          <div class="pt-2">*This guided trail is conducted in English.</div>
        </div>
      </div>
    </div>
    <div class="flex w-full flex-col gap-2">
      <div class="flex w-full justify-end grow-0">
        <a href="/guided-tour/">
          <MainButton square color="brown">
            <span class="material-symbols-outlined"> close </span>
          </MainButton>
        </a>
      </div>
      <div class="flex w-full justify-center grow-0 mt-10">
        <div
          class={`bg-[#F1F1F1] w-[300px] h-fit  z-10 p-3 pb-10 relative shadow-2xl lg:rotate-6`}
        >
          <img
            class="w-[60px] absolute -top-[41px] left-0 scale-x-[-1]"
            src="/assets/images/pin.png"
            alt=""
          />
          <img
            src="/assets/images/site-detail/hero.png"
            class="w-full h-45 object-cover"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
  <div class="py-5">
    <p>
      Join us for a tour of the Tampines Heritage Trail, conducted by the
      students of Junyuan Secondary School and Ngee Ann Secondary School.
      Discover the rich history and vibrant culture of Tampines through the eyes
      of our passionate student guides. This engaging tour brings you through
      iconic landmarks, hidden gems, and stories of the past that have shaped
      this unique community. Experience history brought to life by the next
      generation!
    </p>
  </div>


<!-- Layout Component -->
