<script lang="ts">
  interface Props {
    type?: "1col" | "2col";
    children?: any;
  }
  let { children, type }: Props = $props();
</script>

<div
  class={`w-full my-5 gap-2 grid ${type === "2col" ? " grid-cols-2 " : "grid-cols-1"} `}
>
  {@render children?.()}
</div>
