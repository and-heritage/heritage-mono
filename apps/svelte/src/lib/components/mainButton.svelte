<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
        href?:string;
		children?: Snippet;
        class?:string;
        aosDelay?:number;
        onclick?: () => void;
        color?: 'brown' | 'yellow' | 'white'
		square?:boolean;
	}
	let { children,class:className, onclick, color, square=false }: Props = $props();
</script>
<button onclick={onclick} class={`h-fit font-semibold rounded-xl flex gap-2 cursor-pointer hover:brightness-125 hovered ${className}
${color === 'brown' ? 'bg-main-brown text-white' : color === 'yellow' ? 'bg-main-yellow text-main-brown' : 'bg-white text-main-brown border-3 border-main-brown'}
${square ? 'p-3' : 'px-6 py-3' }
`} >

	{#if children}
		{@render children()}
	{/if}
</button>
