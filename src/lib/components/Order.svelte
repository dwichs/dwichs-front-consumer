<script>
  import OrderItem from "$lib/components/OrderItem.svelte";
  let { order } = $props();

  function formatDateTime(isoString) {
    const d = new Date(isoString);

    const pad = (n) => n.toString().padStart(2, "0");

    const day = pad(d.getDate());
    const month = pad(d.getMonth() + 1); // Months are zero‑based
    const year = d.getFullYear();

    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
</script>

<div class="border border-gray-500 flex p-5 rounded-xl gap-5">
  <div class="space-y-5">
    <div class="grid grid-cols-3">
      {#each order.OrderItem as orderItem}
        <OrderItem {orderItem} />
      {/each}
    </div>
    <p>Status : {order.OrderStatus.name}</p>
    <p>Date : {formatDateTime(order.orderDate)}</p>
    <div>
      <h2>Participants :</h2>
      <ul class="list-disc list-inside">
        {#each order.orderParticipants as orderParticipant}
          <li>{orderParticipant.User.name}</li>
        {/each}
      </ul>
    </div>
    <p>{order.totalPrice} €</p>
  </div>
</div>
