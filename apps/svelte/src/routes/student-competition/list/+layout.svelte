<script lang="ts">
  import { page } from "$app/state";
  import { pushState } from "$app/navigation";
  import MainHeader from "$lib/components/mainHeader.svelte";

  import { fade } from "svelte/transition";
  import Modal from "$lib/components/modal/Modal.svelte";
  import CompetitionModal from "$lib/components/modal/CompetitionModal.svelte";
  import { competition, type CompetitionData } from "$lib/utils/DummyData";
  import MainButton from "$lib/components/mainButton.svelte";

  let { data, children } = $props<{ competition: CompetitionData[] }>();
  //   const competition = $derived(data.competition);

  function openModal(e: MouseEvent, competition: CompetitionData) {
    e.preventDefault();
    const href = `/student-competition/list/${competition.id}`;

    pushState(href, {
      showModal: true,
      selectedModal: competition,
    });
  }

  const active = $state(true);
  const inactive = $state(false);

  let selectedCategory = $state<CompetitionData["category"]>("Upper Primary");

  const filteredCompetition = $derived(
    competition.filter((item) => item.category === selectedCategory),
  );

  function setFilter(category: CompetitionData["category"]) {
    selectedCategory = category;
  }
</script>

<svelte:head>
  {#if page.state.showModal && page.state.selectedModal}
    <title>{page.state.selectedModal.title}</title>
    <meta
      name="description"
      content={`${page.state.selectedModal.description}`}
    />
    <meta property="og:title" content={page.state.selectedModal.title} />
  {:else}
    <title>Heritage</title>
    <meta property="og:title" content="Heritage" />
    <meta
      name="description"
      content="Discover the evolution of Singapore’s legal landscape at the MinLaw Bicentennial 2026 website. Experience virtual heritage stops, engage with roving exhibition content, and learn about the institutions that have upheld justice and progress for two centuries."
    />
    <meta property="og:image" content="/assets/images/meta/landing.png" />
  {/if}
</svelte:head>
<MainHeader />

<div in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
  {#if page.state.showModal && page.state.selectedModal}
    <Modal onClose={() => history.back()}>
      <CompetitionModal
        competition={page.state.selectedModal as CompetitionData}
      />
    </Modal>
  {/if}

  {#if children}
    {@render children()}
  {/if}
  <div class="flex justify-between w-full items-center py-[6dvh] px-[20px]">
    <div class="hidden w-75 lg:block"></div>

    <div class="flex justify-center">
      <div
        class="text-center grid grid-cols-1 w-full md:w-fit md:grid-cols-3 bg-[#481D14] overflow-hidden rounded-xl"
      >
        {#each ["Upper Primary", "Secondary", "Pre-University"] as category}
          <button
            onclick={() => setFilter(category as CompetitionData["category"])}
            class="w-full px-8 py-3 rounded-xl transition-colors duration-300 cursor-pointer
          {selectedCategory === category
              ? 'bg-main-yellow text-[#481D14] outline-2 outline-white'
              : 'bg-transparent text-white hover:bg-white/10'}"
          >
            {category}
          </button>
        {/each}
      </div>
    </div>

    <div class="flex justify-center md:justify-end mt-4 md:mt-0 w-75">
      <MainButton color="yellow">
        <span class="material-icons"> info_outline </span>
        Competition Info
      </MainButton>
    </div>
  </div>
  <div
    class="grid md:grid-cols-3 lg:grid-cols-5 gap-5 max-w-[92rem] mx-auto p-[20px]"
  >
    {#each filteredCompetition ?? [] as item (item.id)}
      <button
        onclick={(e) => openModal(e, item)}
        class={`bg-[#F1F1F1] w-full h-fit  z-10 p-3  relative custom-shadow font-caveat font-bold cursor-pointer hover:scale-105 hovered`}
      >
        <MainButton
          square
          color="yellow"
          class="absolute top-4 right-4 z-[10000] shadow-2xl p-2! rounded-md!"
        >
          <span class="material-icons"> share </span>
        </MainButton>
        <img
          src="/assets/images/site-detail/hero.png"
          class="w-full h-45 object-cover"
          alt=""
        />
        <div class="py-3 text-center">
          <h1 class="text-[24px]">{item.title}</h1>
          <p class="text-[16px]">{item.category}</p>
        </div>
      </button>
    {/each}
  </div>
</div>
