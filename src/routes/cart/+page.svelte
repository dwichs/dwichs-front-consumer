<script>
  let { data } = $props();
  import CartItem from "$lib/components/cartItem.svelte";
  console.log(data)
  console.log("hello")
</script>

<div class="space-y-5">
  {#each data.menuItems.data as menuItem}
    <CartItem {menuItem} />
  {/each}
</div>
