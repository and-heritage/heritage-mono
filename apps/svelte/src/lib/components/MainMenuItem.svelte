<script lang="ts">
  import { page } from "$app/state";
  import { menuState } from "$lib/state/popUpState.svelte";

  interface Props {
    text: string;
    href: string;
    no?:string;
  }
  let { text, href, no }: Props = $props();
  let isActive = $derived(
    href === "/"
      ? page.url.pathname === "/"
      : page.url.pathname.startsWith(href),
  );
  console.log(page.url.pathname);
</script>

<a
  onclick={() => menuState.close()}
  {href}
  class={`relative group hover:text-main-yellow hovered  
${isActive ? "text-main-yellow" : "text-white"}
`}
>

    <img
    class={`absolute w-20 hovered -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 ${isActive ? "opacity-100 ": 'opacity-0'}`}
    src="/assets/icons/arrow_yellow.svg"
    alt=""
  />
  <div class={`w-full flex items-start gap-2 hovered group-hover:ml-24  ${isActive ? "ml-24" : ""}`}>
      <span class="font-source-sans text-[24px] leading-6">{no}</span>
      <span class="leading-[50px]"> {text} </span>
    </div>
</a>
