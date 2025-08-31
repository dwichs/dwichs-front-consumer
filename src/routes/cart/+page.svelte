<script>
  import { PUBLIC_API_BASE_CLIENT } from "$env/static/public";

  let { data } = $props();

  import CartItem from "$lib/components/cartItem.svelte";

  async function handleAddOrder() {
    const res = await fetch(`${PUBLIC_API_BASE_CLIENT}/carts`, {
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
  {#each data.cartItems as menuItem}
    <CartItem {menuItem} />
  {/each}
  <button
    class=" text-3xl bg-yellow-500 transition ease-in-out rounded-full p-3 hover:shadow-xl border w-full cursor-pointer"
    onclick={handleAddOrder}
  >
    Commander
  </button>
</div>
