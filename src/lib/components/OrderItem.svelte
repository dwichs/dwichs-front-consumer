<script>
  let { orderItem } = $props();
</script>

<div
  class="border border-gray-500 flex p-5 rounded-xl gap-5 hover:shadow-xl transition"
>
  <div>
    <div class="flex gap-5">
      <p>{orderItem.imageUrlAtOrder}</p>
      <div class="text-end">
        <h2>{orderItem.nameAtOrder}</h2>
        <p>{orderItem.priceAtOrder}</p>
      </div>
    </div>
  </div>
</div>
