<script>
  import Sandwich from "$lib/assets/food/food.jpg?enhanced";

  let { menuItem } = $props();

  async function handleAddToCart() {
    fetch("http://localhost:3000/cart", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ menuItemId: menuItem.id }),
    });
  }
</script>

<div
  class="border border-gray-100 shadow-xl overflow-hidden rounded-2xl p-5 w-full flex flex-col gap-5 hover:scale-105 hover:shadow-yellow-500 transition ease-in-out duration-200"
>
  <enhanced:img
    src={Sandwich}
    alt="Sandwich"
    class="object-cover rounded-2xl"
  />
  <h1>{menuItem.name}</h1>
  <p>{menuItem.ingredients}</p>
  <p>{menuItem.price}</p>
  <button
    class="rounded-full bg-yellow-500 size-8 cursor-pointer text-center"
    onclick={handleAddToCart}
  >
    +
  </button>
</div>
