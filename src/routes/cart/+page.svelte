<script>
  let { data } = $props();

  console.log(data.cart.data);
</script>

<div class="space-y-5">
  <ul>
    {#each data.cart.data as cartItem}
      <li>{cartItem.menuItemId}</li>
    {/each}
  </ul>
</div>
