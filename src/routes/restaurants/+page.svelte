<script>
  import Restaurant from "$lib/components/Restaurant.svelte";
  /** @type {import('./$types').PageProps} */
  let { data } = $props();
</script>

<div
  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-10 p-4 sm:p-0"
>
  {#each data.restaurants.data as restaurant}
    <Restaurant {restaurant} />
  {/each}
</div>
