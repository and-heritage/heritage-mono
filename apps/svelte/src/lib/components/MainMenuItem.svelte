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
  class={`relative group hover:text-main-accent hovered
${isActive ? "text-main-accent" : "text-white"}
`}
>
    <!-- Accent arrow indicator -->
    <div
    class={`absolute w-6 h-1 hovered -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 bg-main-accent rounded-full top-1/2 -translate-y-1/2 ${isActive ? "opacity-100 ": 'opacity-0'}`}
  ></div>
  <div class={`w-full flex items-start gap-2 hovered group-hover:ml-12  ${isActive ? "ml-12" : ""}`}>
      <span class="font-source-sans text-[24px] leading-6 text-main-accent">{no}</span>
      <span class="leading-[50px]"> {text} </span>
    </div>
</a>
