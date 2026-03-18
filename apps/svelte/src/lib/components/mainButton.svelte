<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
        href?:string;
		children?: Snippet;
        class?:string;
        aosDelay?:number;
        onclick?: () => void;
        color?: 'brown' | 'yellow' | 'white' | 'accent' | 'dark'
		square?:boolean;
	}
	let { children,class:className, onclick, color, square=false }: Props = $props();
</script>
<button onclick={onclick} class={`h-fit font-semibold rounded-xl flex gap-2 cursor-pointer hover:brightness-125 hovered ${className}
${color === 'brown' || color === 'dark' ? 'bg-main-dark-secondary text-white border-2 border-main-accent/30' :
  color === 'yellow' || color === 'accent' ? 'bg-main-accent text-white' :
  'bg-white/10 text-white border-2 border-white/30 backdrop-blur-sm'}
${square ? 'p-3' : 'px-6 py-3' }
`} >

	{#if children}
		{@render children()}
	{/if}
</button>
