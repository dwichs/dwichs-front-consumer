<script lang="ts">
  import { PUBLIC_API_BASE_CLIENT } from "$env/static/public";

  interface User {
    id: string;
    name: string;
    email: string;
  }

  interface Order {
    orderId: number;
    restaurant: string;
    orderDate: string;
    amount: number;
  }

  interface ReimbursementItem {
    id: string; // This should be the actual reimbursement ID from the database
    user: User;
    amount: number;
    orders: Order[];
  }

  interface ReimbursementData {
    owedToMe: ReimbursementItem[];
    owedByMe: ReimbursementItem[];
    summary: {
      totalOwedToMe: number;
      totalOwedByMe: number;
      netBalance: number;
    };
  }

  interface PageData {
    reimbursements: ReimbursementData | null;
    error?: string;
  }

  let { data }: { data: PageData } = $props();

  // Loading states for each reimbursement item
  let loadingStates: Record<string, boolean> = {};

  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  async function markAsPaid(
    reimbursementId: string,
    userId: string,
    amount: number,
  ) {
    const key = `${reimbursementId}_${userId}`;
    loadingStates[key] = true;

    // Debug logging
    console.log("markAsPaid called with:", { reimbursementId, userId, amount });

    const requestBody = {
      reimbursementId,
      userId,
      amount,
      paidAt: new Date().toISOString(),
    };

    console.log("Request body:", requestBody);

    try {
      const response = await fetch(
        `${PUBLIC_API_BASE_CLIENT}/reimbursements/mark-paid`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to mark as paid: ${response.statusText}`);
      }

      await response.json();

      // Refresh the page data or update the local state
      // You might want to dispatch an event or call a parent function to refresh data
      window.location.reload(); // Simple approach - you might want something more elegant
    } catch (error) {
      console.error("Error marking reimbursement as paid:", error);
      alert("Failed to mark as paid. Please try again.");
    } finally {
      loadingStates[key] = false;
    }
  }
</script>

<div class="container mx-auto p-6">
  <h1 class="text-3xl mb-8">Reimbursements</h1>

  {#if data.error}
    <div class="border border-gray-400 px-4 py-3 rounded mb-6">
      <p>Error: {data.error}</p>
    </div>
  {:else if !data.reimbursements}
    <div class="text-center">
      <p class="text-gray-500">Loading reimbursements...</p>
    </div>
  {:else}
    <!-- Summary Section -->
    <div class="p-6 rounded-lg mb-8">
      <h2 class="text-xl mb-4">Summary</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="text-center">
          <p class="text-sm text-gray-600">Owed to Me</p>
          <p class="text-2xl font-bold">
            {formatCurrency(data.reimbursements.summary.totalOwedToMe)}
          </p>
        </div>
        <div class="text-center">
          <p class="text-sm text-gray-600">I Owe</p>
          <p class="text-2xl font-bold">
            {formatCurrency(data.reimbursements.summary.totalOwedByMe)}
          </p>
        </div>
        <div class="text-center">
          <p class="text-sm text-gray-600">Net Balance</p>
          <p class="text-2xl font-bold">
            {formatCurrency(data.reimbursements.summary.netBalance)}
          </p>
        </div>
      </div>
    </div>

    <hr class="border-gray-200 mb-8" />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Money Owed to Me -->
      <div>
        <div
          class="bg-green-100 border border-gray-300 rounded-full p-3 mb-4 inline-block"
        >
          <h2 class="text-xl flex items-center gap-3">
            <span class="material-symbols-outlined"> payment_arrow_down </span>
            Money Owed to Me ({data.reimbursements.owedToMe.length})
          </h2>
        </div>
        {#if data.reimbursements.owedToMe.length === 0}
          <p class="text-gray-500 italic">No one owes you money</p>
        {:else}
          <div class="space-y-4">
            {#each data.reimbursements.owedToMe as item}
              {@const loadingKey = `${item.id}_${item.user.id}`}
              <div class="border border-gray-200 p-4 rounded-lg">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="font-medium">{item.user.name}</h3>
                    <p class="text-sm text-gray-600">{item.user.email}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-lg font-bold">
                      {formatCurrency(item.amount)}
                    </p>
                    <button
                      class="mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={loadingStates[loadingKey]}
                      onclick={() =>
                        markAsPaid(item.id, item.user.id, item.amount)}
                    >
                      {loadingStates[loadingKey]
                        ? "Processing..."
                        : "Mark as Paid"}
                    </button>
                  </div>
                </div>
                <details class="mt-2">
                  <summary
                    class="cursor-pointer text-sm text-gray-700 hover:text-gray-900"
                  >
                    View {item.orders.length} order(s)
                  </summary>
                  <div class="mt-2 space-y-1">
                    {#each item.orders as order, index}
                      <div class="p-3">
                        <p class="font-medium">Order #{order.orderId}</p>
                        <p>{order.restaurant}</p>
                        <p class="text-gray-600">
                          {formatDate(order.orderDate)}
                        </p>
                        <p>
                          {formatCurrency(order.amount)}
                        </p>
                        {#if index < item.orders.length - 1}
                          <hr class="mt-2 border-gray-200" />
                        {/if}
                      </div>
                    {/each}
                  </div>
                </details>
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Money I Owe -->
      <div>
        <div
          class="bg-red-100 border border-gray-300 rounded-full p-3 mb-4 inline-block"
        >
          <h2 class="text-xl flex items-center gap-3">
            <span class="material-symbols-outlined rotate-180">
              payment_arrow_down
            </span>
            Money I Owe ({data.reimbursements.owedByMe.length})
          </h2>
        </div>
        {#if data.reimbursements.owedByMe.length === 0}
          <p class="text-gray-500 italic">You don't owe anyone money</p>
        {:else}
          <div class="space-y-4">
            {#each data.reimbursements.owedByMe as item}
              {@const loadingKey = `${item.id}_${item.user.id}`}
              <div class="border border-gray-200 p-4 rounded-lg">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="font-medium">{item.user.name}</h3>
                    <p class="text-sm text-gray-600">{item.user.email}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-lg font-bold">
                      {formatCurrency(item.amount)}
                    </p>
                    <button
                      class="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={loadingStates[loadingKey]}
                      onclick={() =>
                        markAsPaid(item.id, item.user.id, item.amount)}
                    >
                      {loadingStates[loadingKey]
                        ? "Processing..."
                        : "Mark as Paid"}
                    </button>
                  </div>
                </div>
                <details class="mt-2">
                  <summary
                    class="cursor-pointer text-sm text-gray-700 hover:text-gray-900"
                  >
                    View {item.orders.length} order(s)
                  </summary>
                  <div class="mt-2 space-y-1">
                    {#each item.orders as order, index}
                      <div class="text-xs p-3">
                        <p class="font-medium">Order #{order.orderId}</p>
                        <p>{order.restaurant}</p>
                        <p class="text-gray-600">
                          {formatDate(order.orderDate)}
                        </p>
                        <p class="font-medium">
                          {formatCurrency(order.amount)}
                        </p>
                        {#if index < item.orders.length - 1}
                          <hr class="mt-2 border-gray-200" />
                        {/if}
                      </div>
                    {/each}
                  </div>
                </details>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>

    {#if data.reimbursements.owedToMe.length === 0 && data.reimbursements.owedByMe.length === 0}
      <div class="text-center p-8 rounded-lg">
        <p class="text-lg text-gray-700">🎉 You're all settled up!</p>
        <p class="text-sm text-gray-600 mt-2">No outstanding reimbursements</p>
      </div>
    {/if}
  {/if}
</div>
