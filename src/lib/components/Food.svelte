<script>
  import Sandwich from "$lib/assets/food/food.jpg?enhanced";
  import { PUBLIC_API_BASE_CLIENT } from "$env/static/public";
  import { currentGroup } from "$lib/stores/currentGroup.js";
  import { get } from "svelte/store";

  let { menuItem } = $props();

  async function handleAddToCart() {
    try {
      const currentGroupValue = get(currentGroup);
      const url = currentGroupValue
        ? `${PUBLIC_API_BASE_CLIENT}/carts?groupId=${currentGroupValue}`
        : `${PUBLIC_API_BASE_CLIENT}/carts`;

      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ menuItemId: menuItem.id }),
      });

      if (response.ok) {
        console.log("Item added to cart successfully");
        // You can add user feedback here (toast, etc.)
      } else {
        console.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
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
