<script lang="ts">
  import type { PageProps } from "./$types";

  interface User {
    id: string;
    name: string;
  }

  interface OrderParticipant {
    orderId: number;
    userId: string;
    User: User;
  }

  interface MenuItem {
    id: number;
    category: string;
    ingredients: string;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    restaurantId: number;
  }

  interface OrderItem {
    id: number;
    priceAtOrder: string;
    nameAtOrder: string;
    imageUrlAtOrder: string;
    descriptionAtOrder: string;
    specialRequest: string | null;
    orderId: number;
    menuItemId: number;
    userId: string | null;
    MenuItem: MenuItem;
  }

  interface OrderStatus {
    id: number;
    name: string;
  }

  interface Order {
    id: number;
    totalPrice: string;
    orderDate: string;
    statusId: number;
    paymentMethodId: number | null;
    restaurantId: number;
    orderParticipants: OrderParticipant[];
    OrderItem: OrderItem[];
    PaymentMethod: any | null;
    OrderStatus: OrderStatus;
  }

  interface OrdersData {
    orders?: Order[];
  }

  let { data }: PageProps & { data: OrdersData } = $props();

  const currentUserId = data.orders?.[0]?.orderParticipants?.[0]?.userId;

  const myTotal = (items: OrderItem[]): number =>
    items
      .filter((item: OrderItem) => item.userId === currentUserId)
      .reduce(
        (sum: number, item: OrderItem) => sum + Number(item.priceAtOrder),
        0,
      );
</script>

<div class="p-6 space-y-6">
  <h1 class="text-2xl">My Order History</h1>

  {#each data.orders || [] as order}
    <div class="border rounded-lg p-4 space-y-4">
      <div class="flex justify-between border-b pb-3">
        <div>
          <h3>Order #{order.id}</h3>
          <p class="text-sm text-gray-600">
            {new Date(order.orderDate).toLocaleString("fr-FR")}
          </p>
          <p class="text-sm {order.orderParticipants.length > 1}">
            {order.orderParticipants.length > 1
              ? "Group Order"
              : "Personal Order"}
          </p>
        </div>

        <div
          class="px-3 py-1 rounded-full flex h-min text-sm text-white
          {order.OrderStatus.name === 'Pending'
            ? 'bg-blue-500'
            : order.OrderStatus.name === 'Cancelled'
              ? 'bg-red-500'
              : order.OrderStatus.name === 'Picked Up'
                ? 'bg-green-500'
                : 'bg-yellow-500'}"
        >
          {order.OrderStatus.name}
        </div>
      </div>

      <div class="space-y-2">
        <h4>Your Items:</h4>

        <ul class="pl-5 list-disc space-y-1">
          {#each order.OrderItem.filter((item) => item.userId === currentUserId) as item}
            <li class="flex justify-between">
              <div>
                <span>{item.nameAtOrder}</span>
                {#if item.specialRequest}
                  <div class="text-sm text-gray-600">{item.specialRequest}</div>
                {/if}
              </div>
              <span>${item.priceAtOrder}</span>
            </li>
          {/each}
        </ul>

        {#if order.orderParticipants.length > 1}
          {@const otherItems = order.OrderItem.filter(
            (item) => item.userId !== currentUserId,
          )}
          {#if otherItems.length}
            <div class="border-t pt-3 space-y-1">
              <h4>Other Participants:</h4>
              <ul class="list-disc pl-6 space-y-1">
                {#each otherItems as item}
                  {@const participant = order.orderParticipants.find(
                    (p) => p.userId === item.userId,
                  )}
                  <li class="flex justify-between text-gray-700">
                    <div>
                      <span>{item.nameAtOrder}</span>
                      <span class="text-sm"
                        >by {participant?.User?.name || "Unknown"}</span
                      >
                    </div>
                    <span>${item.priceAtOrder}</span>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
        {/if}
      </div>

      <div class="border-t pt-3 space-y-1">
        <div class="flex justify-between">
          <span>Your Total:</span>
          <span>${myTotal(order.OrderItem).toFixed(2)}</span>
        </div>
        {#if order.orderParticipants.length > 1}
          <div class="flex justify-between text-sm text-gray-600">
            <span>Group Total:</span>
            <span>${order.totalPrice}</span>
          </div>
        {/if}
      </div>
    </div>
  {:else}
    <div class="text-center py-12 text-gray-600">
      <p>No orders found</p>
    </div>
  {/each}
</div>
