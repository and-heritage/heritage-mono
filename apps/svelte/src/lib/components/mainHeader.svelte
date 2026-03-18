<script lang="ts">
  import { menuState, tutorialState } from "$lib/state/popUpState.svelte";
  import MainButton from "./mainButton.svelte";
</script>

<header
  class="w-full absolute top-0 h-[6rem] flex justify-between items-center z-[99999] px-[20px] py-5 bg-linear-to-b from-main-dark to-transparent
  md:px-[30px]
  "
>
  <img src="/assets/images/snf-logo.svg" class="w-30 md:w-44" alt="Singapore Night Festival" />
  <div class="flex items-center gap-1 md:gap-3 " >
    <MainButton
      color="yellow"
      onclick={() => tutorialState.toggle()}
      class="p-3!"
    >
      <span class="material-symbols-outlined"> help </span>
      <span class="hidden md:block"> Tutorial </span>
    </MainButton>
    <MainButton color="yellow" class="p-3!">
      <span class="material-symbols-outlined"> tour </span>
      <span class="hidden md:block"> Book Tour </span>
    </MainButton>
    <MainButton color="yellow" onclick={() => menuState.open()} class="p-3!">
      <span class="material-symbols-outlined"> menu </span>
      <span class="hidden md:block"> Menu </span>
    </MainButton>
  </div>
</header>
