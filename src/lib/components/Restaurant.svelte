<script>
  import Logo from "$lib/assets/restaurants/le-switch-logo.png?enhanced";
  let { restaurant } = $props();
</script>

<a
  href={`/restaurants/${restaurant.name}/${restaurant.id}`}
  class="border-gray-300 border rounded-3xl overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
>
  <div class="relative overflow-hidden">
    <enhanced:img
      src={Logo}
      alt="Restaurant logo"
      class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
    />
  </div>

  <div class="p-6">
    <h3 class="text-lg p-1 font-semibold text-gray-900 leading-tight">
      {restaurant.name}
    </h3>
  </div>
</a>
