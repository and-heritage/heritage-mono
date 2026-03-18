<script lang="ts">
  import type { Snippet } from "svelte";
  import pin from "$lib/assets/images/pin.png";
  interface Props {
    text?: string;
    img: string;
    href: string;
    children?: Snippet;
    class?: string;
    aosDelay?: any;
  }
  let {
    text,
    img,
    children,
    href,
    class: className,
    aosDelay,
  }: Props = $props();
</script>

<div
  data-aos="fade-in"
  data-aos-delay={aosDelay}
  data-aos-anchor="#aos-trigger"
  class=" w-[250px] h-[230px] hover:z-[9999]
      odd:-translate-x-6
      translate-x-6
      md:odd:-translate-x-0
      md:translate-x-0
  "
>
  <a
    {href}
    class={`bg-main-dark-secondary flex flex-col z-10 p-5 relative shadow-2xl rounded-lg border border-main-accent/20 hover:scale-120 hover:opacity-100! hover:border-main-accent/50 group-hover:opacity-50
  transition-all ease-in-out duration-200 ${className}
    -translate-y-0
    `}
  >
    <!-- Night theme accent dot -->
    <div class="w-4 h-4 rounded-full bg-main-accent absolute -top-2 right-4 shadow-lg shadow-main-accent/50"></div>

    <img src={img} class="w-full h-45 object-cover rounded" alt="" />
    <h1
      class="font-caveat font-bold text-white text-[28px] h-full w-full flex justify-center items-center text-center"
    >
      {text}
    </h1>
  </a>
</div>
