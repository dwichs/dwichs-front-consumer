<script>
  import Logo from "$lib/assets/restaurants/le-switch-logo.png?enhanced";
</script>

<a
  href="/restaurants/le-switch"
  class="border border-gray-100 shadow-xl overflow-hidden rounded-2xl p-5 w-full flex flex-col gap-5 hover:scale-105 transition ease-in-out duration-200"
>
  <enhanced:img src={Logo} alt="Restaurant logo" class="object-cover" />
  <div class="space-y-5">
    <h3 class="text-2xl">Le Switch</h3>
    <div class="flex gap-5">
      <p>4,1</p>
      <span class="material-symbols-outlined"> star </span>
    </div>
  </div>
</a>
