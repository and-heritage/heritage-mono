<script>
  import SplitPaperLayout from "$lib/components/layouts/SplitPaperLayout.svelte";
import MainHeader from "$lib/components/mainHeader.svelte";
  import QuizSplitPaperLayout from "$lib/components/quiz/QuizSplitPaperLayout.svelte";

  let { children } = $props();

</script>


<MainHeader />
<QuizSplitPaperLayout title="How well do you know Tiong Bahru?">
    {@render children?.()}
</QuizSplitPaperLayout>