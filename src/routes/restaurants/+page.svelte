<script>
  import Restaurant from "$lib/components/Restaurant.svelte";
  /** @type {import('./$types').PageProps} */

  let { data } = $props();
</script>

<div class="grid grid-cols-4 gap-10">
  {#each data.restaurants.data as restaurant}
    <Restaurant {restaurant} />
  {/each}
</div>
