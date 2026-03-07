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
    class={`bg-[#F1F1F1] flex flex-col z-10 p-5 relative shadow-2xl  hover:scale-120 hover:opacity-100! group-hover:opacity-50
  transition-all ease-in-out duration-200 ${className}
    -translate-y-0 
    
    `}
  >
    <!-- <div class="absolute w-full h-full top-0 left-0 opacity-0 bg-main-brown z-[9999]"></div> -->
    <img src={pin} class="w-[60px] absolute -top-[41px] right-0" alt="" />

    <img src={img} class="w-full h-45 object-cover" alt="" />
    <h1
      class="font-caveat font-bold text-main-brown text-[28px] h-full w-full flex justify-center items-center text-center"
    >
      {text}
    </h1>
  </a>
</div>
