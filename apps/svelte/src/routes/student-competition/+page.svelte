<script lang="ts">
  import MainButton from "$lib/components/mainButton.svelte";
  const active = $state(true);
  const inactive = $state(false);
</script>

<div
  class="flex w-full flex-col gap-5 items-center text-center max-w-5xl mx-auto py-[6dvh] px-[20px]"
>
  <div class="flex w-full justify-center">
    <div class="grid grid-cols-1 w-full md:w-fit md:grid-cols-3 bg-[#481D14] overflow-hidden rounded-xl">
      <div
        class={`w-full px-8 py-3 rounded-xl outline-2 outline-transparent ${active ? "bg-main-yellow outline-white text-[#481D14]" : "bg-transparent text-white"} hover:bg-main-yellow hover:text-[#481D14] hover:outline-white cursor-pointer transition-colors duration-300`}
      >
        Upper Primary
      </div>

      <div
        class={`hidden md:block w-full px-8 py-3 rounded-xl outline-2 outline-transparent ${inactive ? "bg-main-yellow outline-white text-[#481D14]" : "bg-transparent text-white"} hover:bg-main-yellow hover:text-[#481D14] hover:outline-white cursor-pointer transition-colors duration-300`}
      >
        Upper Primary
      </div>
      <div
        class={`hidden md:block w-full px-8 py-3 rounded-xl outline-2 outline-transparent ${inactive ? "bg-main-yellow outline-white text-[#481D14]" : "bg-transparent text-white"} hover:bg-main-yellow hover:text-[#481D14] hover:outline-white cursor-pointer transition-colors duration-300`}
      >
        Upper Primary
      </div>
    </div>
  </div>
  <div class="flex flex-col items-center gap-5">
    <h1 class="text-4xl font-bold font-averia">
      Imagining Our Future Through the Rule of Law
    </h1>
    <p>
      The rule of law means that everyone follows the same laws, no matter who
      they are — students, adults, community leaders, and even the Government.
      Just as school rules create a safe and respectful learning environment,
      the rule of law helps keep Singapore safe, fair, and peaceful for all. It
      reminds us that no one is above the law, everyone is protected by it, and
      there are fair systems — such as the courts — to resolve problems when
      rules are broken. From traffic regulations that keep our roads safe, to
      laws that protect our belongings and environment, these rules help us live
      together with trust and harmony. In this competition, students are invited
      to reflect on why respecting rules matters in our daily lives and to
      imagine what Singapore might look like 50 years from now if everyone
      continues to uphold the rule of law. How would our communities grow? What
      kind of society could we build together?
    </p>
    <a href="/student-competition/list">
      <MainButton color="yellow">View Competition List</MainButton>
    </a>
  </div>
</div>
