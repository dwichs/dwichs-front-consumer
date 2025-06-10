<script>
  import Order from "$lib/components/Order.svelte";

  let { data } = $props();
</script>

<h1 class="text-3xl underline">Commandes :</h1>
<div class="space-y-5">
  {#each data.userOrders.data as order}
    <Order {order} />
  {/each}
</div>
