<script>
  let { data } = $props();
  import CartItem from "$lib/components/cartItem.svelte";

  async function handleAddOrder() {
    const res = await fetch("http://localhost:3000/orders", {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      return;
    }

    window.location.href = `/thanks/`;
  }
</script>

<div class="space-y-5">
  {#each data.menuItems.data as menuItem}
    <CartItem {menuItem} />
  {/each}
  <button
    class=" text-3xl bg-yellow-500 transition ease-in-out rounded-full p-3 hover:shadow-xl border w-full cursor-pointer"
    onclick={handleAddOrder}
  >
    Commander
  </button>
</div>
