<script>
  let { competition } = $props();
</script>

<div class="w-full h-fit flex gap-10 flex-col md:flex-row items-stretch mt-[10dvh]">
  <div class="w-full md:w-1/2 hidden md:block">
    <img src="/assets/images/site-detail/hero.png" alt="" class="rounded-lg" />
  </div>
  <div class="w-full md:w-1/2">
    <h1 class="text-[28px] md:text-[64px] font-averia font-bold md:mb-3 leading-15 text-white">{competition.title}</h1>
    <div class="font-bold mb-2 text-main-accent">
        Group : {#each competition.students as student, index}
           {student}{index < competition.students.length - 1 ? ', ' : ''}
        {/each}
    </div>
    <div class="w-full mb-6 block md:hidden">
      <img src="/assets/images/site-detail/hero.png" alt="" class="rounded-lg" />
    </div>

    <p class="text-white/80">{competition.description}</p>
  </div>
</div>
