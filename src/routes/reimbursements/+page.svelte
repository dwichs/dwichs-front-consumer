<script lang="ts">
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

  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
</script>

<div class="container mx-auto p-6 max-w-4xl">
  <h1 class="text-3xl font-bold mb-8 text-center">Reimbursements</h1>

  {#if data.error}
    <div
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
    >
      <p>Error: {data.error}</p>
    </div>
  {:else if !data.reimbursements}
    <div class="text-center">
      <p class="text-gray-500">Loading reimbursements...</p>
    </div>
  {:else}
    <!-- Summary Section -->
    <div class="bg-gray-50 p-6 rounded-lg mb-8">
      <h2 class="text-xl font-semibold mb-4">Summary</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="text-center">
          <p class="text-sm text-gray-600">Owed to Me</p>
          <p class="text-2xl font-bold text-green-600">
            {formatCurrency(data.reimbursements.summary.totalOwedToMe)}
          </p>
        </div>
        <div class="text-center">
          <p class="text-sm text-gray-600">I Owe</p>
          <p class="text-2xl font-bold text-red-600">
            {formatCurrency(data.reimbursements.summary.totalOwedByMe)}
          </p>
        </div>
        <div class="text-center">
          <p class="text-sm text-gray-600">Net Balance</p>
          <p
            class="text-2xl font-bold {data.reimbursements.summary.netBalance >=
            0
              ? 'text-green-600'
              : 'text-red-600'}"
          >
            {formatCurrency(data.reimbursements.summary.netBalance)}
          </p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Money Owed to Me -->
      <div>
        <h2 class="text-xl font-semibold mb-4 text-green-700">
          Money Owed to Me ({data.reimbursements.owedToMe.length})
        </h2>
        {#if data.reimbursements.owedToMe.length === 0}
          <p class="text-gray-500 italic">No one owes you money</p>
        {:else}
          <div class="space-y-4">
            {#each data.reimbursements.owedToMe as item}
              <div class="bg-green-50 border border-green-200 p-4 rounded-lg">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="font-medium">{item.user.name}</h3>
                    <p class="text-sm text-gray-600">{item.user.email}</p>
                  </div>
                  <p class="text-lg font-bold text-green-600">
                    {formatCurrency(item.amount)}
                  </p>
                </div>
                <details class="mt-2">
                  <summary
                    class="cursor-pointer text-sm text-gray-700 hover:text-gray-900"
                  >
                    View {item.orders.length} order(s)
                  </summary>
                  <div class="mt-2 space-y-1">
                    {#each item.orders as order}
                      <div class="text-xs bg-white p-2 rounded border">
                        <p><strong>{order.restaurant}</strong></p>
                        <p class="text-gray-600">
                          {formatDate(order.orderDate)}
                        </p>
                        <p class="font-medium">
                          {formatCurrency(order.amount)}
                        </p>
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
        <h2 class="text-xl font-semibold mb-4 text-red-700">
          Money I Owe ({data.reimbursements.owedByMe.length})
        </h2>
        {#if data.reimbursements.owedByMe.length === 0}
          <p class="text-gray-500 italic">You don't owe anyone money</p>
        {:else}
          <div class="space-y-4">
            {#each data.reimbursements.owedByMe as item}
              <div class="bg-red-50 border border-red-200 p-4 rounded-lg">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="font-medium">{item.user.name}</h3>
                    <p class="text-sm text-gray-600">{item.user.email}</p>
                  </div>
                  <p class="text-lg font-bold text-red-600">
                    {formatCurrency(item.amount)}
                  </p>
                </div>
                <details class="mt-2">
                  <summary
                    class="cursor-pointer text-sm text-gray-700 hover:text-gray-900"
                  >
                    View {item.orders.length} order(s)
                  </summary>
                  <div class="mt-2 space-y-1">
                    {#each item.orders as order}
                      <div class="text-xs bg-white p-2 rounded border">
                        <p><strong>{order.restaurant}</strong></p>
                        <p class="text-gray-600">
                          {formatDate(order.orderDate)}
                        </p>
                        <p class="font-medium">
                          {formatCurrency(order.amount)}
                        </p>
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
      <div class="text-center mt-8 p-8 bg-blue-50 rounded-lg">
        <p class="text-lg text-gray-700">🎉 You're all settled up!</p>
        <p class="text-sm text-gray-600 mt-2">No outstanding reimbursements</p>
      </div>
    {/if}
  {/if}
</div>
