<script lang="ts">
    interface Props {
        text: string;
        type?: "default" | "correct" | "wrong";
        options?: string;
    }
        let { text, type = "default" } : Props = $props();
</script>

<div class={`w-full py-3 px-5 rounded-lg text-[18px] cursor-pointer hovered
    ${type === "correct" ? "bg-[#098E42] text-white" : type === "wrong" ? "bg-[#E63946] text-white" : "bg-white text-main-brown hover:bg-main-brown hover:text-white "}
    `}>
    A. 
    {text}  


</div>