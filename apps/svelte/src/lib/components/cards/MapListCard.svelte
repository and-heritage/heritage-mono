<script lang="ts">
import MainButton from "../mainButton.svelte";

</script>

<div class="flex flex-col lg:flex-row gap-10 mb-20">
  <div
    class={`bg-[#F1F1F1] w-[310px] h-fit  z-10 p-3 pb-10 relative shadow-2xl`}
  >
    <img
      class="w-[60px] absolute -top-[41px] left-0 scale-x-[-1]"
      src="/assets/images/pin.png"
      alt=""
    />
    <img src="/assets/images/site-detail/hero.png" class="w-full h-45 object-cover" alt="" />
  </div>
  <div>
    <div class="font-averia border-b border-black/50 mb-5 pb-5">
      <h1 class="font-bold italic text-[48px] text-main-brown">
        Justice in Site
      </h1>
      <p class="font-light text-[24px] leading-7">
        Two Centuries of Progress through the Rule of Law
      </p>
    </div>
    <div class="space-y-2 mb-5">
      <div class="flex gap-2">
        <div class="shrink flex gap-2 w-30">
          <span class="material-symbols-rounded"> location_on </span> Venue
        </div>
        :
        <div class="flex-1">Our Tampines Hub</div>
      </div>
      <div class="flex gap-2">
        <div class="shrink flex gap-2 w-30">
          <span class="material-symbols-rounded"> confirmation_number </span> Admission
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
    </div>
    <div>
    <a href="/guided-tour/single/">
        <MainButton color="brown">
            <span class="material-symbols-outlined"> visibility </span>
            More Details
        </MainButton>
    </a>
    </div>
  </div>
</div>
