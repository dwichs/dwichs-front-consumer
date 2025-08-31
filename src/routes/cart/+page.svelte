<script>
  import { PUBLIC_API_BASE_CLIENT } from "$env/static/public";
  import CartItem from "$lib/components/cartItem.svelte";
  let { data } = $props();

  const total = data.cartItems
    .reduce((sum, item) => {
      return sum + parseFloat(item.price);
    }, 0)
    .toFixed(2);

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
  {#each data.cartItems as cartItem}
    <CartItem {cartItem} />
  {/each}

  <div class="flex w-full justify-end">
    <span class="text-xl">Total: {total}</span>
  </div>

  <button
    class="text-3xl bg-yellow-500 transition ease-in-out rounded-full p-3 mb-5 hover:shadow-xl border w-full cursor-pointer"
    onclick={handleAddOrder}
  >
    Commander
  </button>
</div>
