<script>
  import Sandwich from "$lib/assets/food/food.jpg?enhanced";

  let { menuItem } = $props();
</script>

<div
  class="border border-gray-500 flex p-5 rounded-xl gap-5 hover:shadow-xl transition"
>
  <div class="w-1/8">
    <enhanced:img
      src={Sandwich}
      alt="Sandwich"
      class="object-cover rounded-xl"
    />
  </div>
  <div>
    <h1>{menuItem.name}</h1>
    <p>{menuItem.ingredients}</p>
    <p>{menuItem.price}</p>
  </div>
</div>
