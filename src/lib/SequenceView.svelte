<script lang="ts">
  //import { props } from 'svelte';
  import DragDropList from './DragDropList.svelte';
  import type { BaseQuestion } from '../quiz';

  const { question }: { question: BaseQuestion } = $props();

  // Update question.selected whenever the answers array changes
  $effect(() => {
    question.selected = question.answers.map((answer) => answer.id);
  });
</script>


<DragDropList bind:data={question.answers} />
