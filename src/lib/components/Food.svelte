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
  class=" rounded-3xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-300"
>
  <div class="relative overflow-hidden">
    <enhanced:img
      src={Sandwich}
      alt="Sandwich"
      class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
    />
    <button
      class="absolute cursor-pointer hover:bg-yellow-500 hover:text-white bottom-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-xl font-medium text-gray-900 hover:bg-yellow-50 transition-colors duration-200"
      onclick={handleAddToCart}
    >
      <span class="material-symbols-outlined"> add </span>
    </button>
  </div>

  <div class="p-6 space-y-3">
    <h3 class="text-lg font-semibold text-gray-900 leading-tight">
      {menuItem.name}
    </h3>

    <p class="text-sm text-gray-500 leading-relaxed">
      {menuItem.ingredients}
    </p>

    <p class="text-xl font-bold text-gray-900">
      {menuItem.price}
    </p>
  </div>
</div>
