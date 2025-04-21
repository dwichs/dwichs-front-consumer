<script>
  import Sandwich from "$lib/assets/food/food.jpg?enhanced";
</script>

<div
  class="border border-gray-100 shadow-xl overflow-hidden rounded-2xl p-5 w-full flex flex-col gap-5 hover:scale-105 hover:shadow-yellow-500 transition ease-in-out duration-200"
>
  <enhanced:img
    src={Sandwich}
    alt="Sandwich"
    class="object-cover rounded-2xl"
  />
  <div class="space-y-5">
    <h3 class="text-2xl">Le Switch</h3>
    <p>Jambon de parme, mozzarella, pesto, tomates, roquette.</p>
    <p>€ 5</p>
    <button class="rounded-full bg-yellow-500 size-5 cursor-pointer">
      +
    </button>
  </div>
</div>
