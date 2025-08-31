<script>
  import Sandwich from "$lib/assets/food/food.jpg?enhanced";
  import { PUBLIC_API_BASE_CLIENT } from "$env/static/public";
  import { currentGroup } from "$lib/stores/currentGroup.js";
  import { get } from "svelte/store";

  let { cartItem } = $props();

  async function handleDeleteItem() {
    try {
      const currentGroupValue = get(currentGroup);
      const url = currentGroupValue
        ? `${PUBLIC_API_BASE_CLIENT}/carts/${cartItem.cartItemId}?groupId=${currentGroupValue}`
        : `${PUBLIC_API_BASE_CLIENT}/carts/${cartItem.cartItemId}`;

      const response = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        // Refresh the page or emit an event to update the cart
        window.location.reload();
      } else {
        console.error("Failed to delete item from cart");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }
</script>

<div class="border-b border-gray-200 pb-4">
  <div class="flex gap-4">
    <div class="w-20 h-20 flex-shrink-0">
      <enhanced:img
        src={Sandwich}
        alt={cartItem.name}
        class="w-full h-full object-cover rounded-lg"
      />
    </div>
    <div class="flex-1">
      <div class="flex justify-between items-center">
        <h2 class="text-lg text-gray-900">{cartItem.name}</h2>
        <div class="flex items-center gap-2">
          <span class="text-lg">${cartItem.price}</span>
          <button
            onclick={handleDeleteItem}
            class="cursor-pointer hover:text-red-500 flex items-center justify-center w-6 h-6"
            title="Remove item"
          >
            <span class="material-symbols-outlined text-lg leading-none"
              >close</span
            >
          </button>
        </div>
      </div>
      <p class="text-sm text-gray-600">{cartItem.ingredients}</p>
      {#if cartItem.addedBy}
        <p class="text-sm text-gray-600">Added by {cartItem.addedBy.name}</p>
      {/if}
    </div>
  </div>
</div>
