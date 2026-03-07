<script lang="ts">
  interface Props {
    text: string;
    class?: string;
  }
  let { text, class: className }: Props = $props();
</script>

<div
  class={`absolute h-[30rem]  text-white text-center text-[30px] z-40 ${className} pointer-events-none`}
>
  <div class="relative size-full">
    <div
      class="bg-[#098E42] h-fit min-w-[30rem] w-full px-2 py-2 rounded-3xl outline-3 outline-white"
    >
      <div class="size-full border-2 rounded-2xl px-5 py-3 font-semibold">
        {text}
      </div>
    </div>

    <div class="absolute -top-10 -z-1 -translate-x-1/2 left-1/2 h-fit">
      <svg
        width="54"
        height="514"
        viewBox="0 0 54 514"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="12.2822"
          y="20.4707"
          width="28.6604"
          height="492.795"
          fill="url(#paint0_linear_1948_702)"
        />
        <rect
          opacity="0.5"
          x="12.2822"
          y="20.4707"
          width="28.6604"
          height="14.3302"
          fill="url(#paint1_linear_1948_702)"
        />
        <rect
          opacity="0.5"
          x="12.2822"
          y="171.963"
          width="28.6604"
          height="14.3302"
          fill="url(#paint2_linear_1948_702)"
        />
        <rect
          width="53.2264"
          height="20.4717"
          fill="url(#paint3_linear_1948_702)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1948_702"
            x1="12.2822"
            y1="266.868"
            x2="40.9426"
            y2="266.868"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#DDDDDD" />
            <stop offset="0.245192" stop-color="#E7E7E7" />
            <stop offset="0.524541" stop-color="#C2C2C2" />
            <stop offset="0.787969" stop-color="#7D7D7D" />
            <stop offset="1" stop-color="#838383" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_1948_702"
            x1="26.6124"
            y1="20.4707"
            x2="26.6124"
            y2="34.8009"
            gradientUnits="userSpaceOnUse"
          >
            <stop />
            <stop offset="1" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_1948_702"
            x1="26.6124"
            y1="171.963"
            x2="26.6124"
            y2="186.293"
            gradientUnits="userSpaceOnUse"
          >
            <stop />
            <stop offset="1" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_1948_702"
            x1="0"
            y1="10.2358"
            x2="53.2264"
            y2="10.2358"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#DDDDDD" />
            <stop offset="0.245192" stop-color="#E7E7E7" />
            <stop offset="0.524541" stop-color="#C2C2C2" />
            <stop offset="0.787969" stop-color="#7D7D7D" />
            <stop offset="1" stop-color="#838383" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
</div>
