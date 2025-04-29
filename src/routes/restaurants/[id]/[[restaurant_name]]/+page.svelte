<script>
  import Food from "$lib/components/Food.svelte";
  /** @type {import('./$types').PageProps} */

  let { data } = $props();
</script>

<div class="grid grid-cols-4 gap-10">
  {#each data.menuItems.data as menuItem}
    <Food {menuItem} />
  {/each}
</div>
