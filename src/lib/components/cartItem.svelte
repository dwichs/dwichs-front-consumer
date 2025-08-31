<script>
  import Sandwich from "$lib/assets/food/food.jpg?enhanced";
  let { menuItem } = $props();
</script>

<div class="border-b border-gray-200 pb-4">
  <div class="flex gap-4">
    <div class="w-20 h-20 flex-shrink-0">
      <enhanced:img
        src={Sandwich}
        alt={menuItem.name}
        class="w-full h-full object-cover rounded-lg"
      />
    </div>
    <div class="flex-1">
      <div class="flex justify-between items-start">
        <h2 class="text-lg text-gray-900">{menuItem.name}</h2>
        <span class="text-lg">${menuItem.price}</span>
      </div>
      <p class="text-sm text-gray-600">{menuItem.ingredients}</p>
      {#if menuItem.addedBy}
        <p class="text-sm text-gray-600">Added by {menuItem.addedBy.name}</p>
      {/if}
    </div>
  </div>
</div>
