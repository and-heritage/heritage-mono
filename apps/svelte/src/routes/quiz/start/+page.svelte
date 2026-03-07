<script>
  import MainButton from "$lib/components/mainButton.svelte";
import AnswersItem from "$lib/components/quiz/AnswersItem.svelte";
  import AnswersLayout from "$lib/components/quiz/AnswersLayout.svelte";
</script>

<div class="size-full flex flex-col items-start justify-between">
  <div class=" w-full">
    <div>
      <h2 class="font-bold font-averia md:text-[28px] text-main-brown">
        Question 1
      </h2>
      <h1 class="font-bold font-averia md:text-[32px]">
        When was the original marketplace in Tiong Bahru first established?
      </h1>
      <img class="w-1/2" src="/assets/images/site-detail/hero.png" alt="">
    </div>
    <AnswersLayout type="1col">
      <AnswersItem text="1920s" />
      <AnswersItem text="1930s" />
      <AnswersItem text="1940s" type="wrong" />
      <AnswersItem text="1950s" />
    </AnswersLayout>
    <div class="w-full text-[16px] mt-5">
        Hint:  Tiong Bahru is one of Singapore’s oldest housing estates, developed before World War II. The original marketplace was established around the same early period.
    </div>
    <div class="w-full flex justify-end my-5">
       <MainButton color="yellow" class="px-12! justify-center">
            Submit Answer
          </MainButton>
    </div>
  </div>
</div>
