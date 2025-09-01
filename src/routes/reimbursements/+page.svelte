<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { PUBLIC_API_BASE_CLIENT } from "$env/static/public";

  interface User {
    id: string;
    name: string;
    email: string;
  }

  interface Reimbursement {
    id: number; // Actual reimbursement ID from database
    orderId: number;
    restaurant: string;
    orderDate: string;
    amount: number;
    status: string;
    createdAt: string;
    updatedAt: string;
  }

  interface ReimbursementItem {
    user: User;
    amount: number;
    reimbursements: Reimbursement[];
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

  // Loading states for each reimbursement
  let loadingStates: Record<number, boolean> = $state({});

  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  function getStatusBadgeClass(status: string): string {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "unpaid":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  }

  async function markReimbursementAsPaid(reimbursementId: number) {
    loadingStates[reimbursementId] = true;

    console.log("markReimbursementAsPaid called with:", { reimbursementId });

    const requestBody = {
      reimbursementId,
      status: "paid",
      settledAt: new Date().toISOString(),
    };

    console.log("Request body:", requestBody);

    try {
      const response = await fetch(
        `${PUBLIC_API_BASE_CLIENT}/reimbursements/${reimbursementId}/mark-paid`,
        {
          credentials: "include",
          method: "PATCH",
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

      await invalidateAll();
    } catch (error) {
      console.error("Error marking reimbursement as paid:", error);
      alert("Failed to mark as paid. Please try again.");
    } finally {
      loadingStates[reimbursementId] = false;
    }
  }

  // Helper function to check if all reimbursements in a group are paid
  function areAllReimbursementsPaid(reimbursements: Reimbursement[]): boolean {
    return reimbursements.every((r) => r.status === "paid");
  }

  // Helper function to count unpaid reimbursements
  function countUnpaidReimbursements(reimbursements: Reimbursement[]): number {
    return reimbursements.filter((r) => r.status === "unpaid").length;
  }

  // Helper function to get status display text
  function getStatusDisplayText(status: string): string {
    return status === "paid" ? "Paid" : "Unpaid";
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
              <div class="border border-gray-200 p-4 rounded-lg">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="font-medium">{item.user.name}</h3>
                    <p class="text-sm text-gray-600">{item.user.email}</p>
                    <div class="flex gap-2 mt-2">
                      <span
                        class="text-xs px-2 py-1 rounded-full border {areAllReimbursementsPaid(
                          item.reimbursements,
                        )
                          ? 'bg-green-100 text-green-800 border-green-200'
                          : 'bg-red-100 text-red-800 border-red-200'}"
                      >
                        {areAllReimbursementsPaid(item.reimbursements)
                          ? "All Paid"
                          : `${countUnpaidReimbursements(item.reimbursements)} Unpaid`}
                      </span>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-lg font-bold">
                      {formatCurrency(item.amount)}
                    </p>
                  </div>
                </div>
                <details class="mt-2">
                  <summary
                    class="cursor-pointer text-sm text-gray-700 hover:text-gray-900"
                  >
                    View {item.reimbursements.length} reimbursement(s)
                  </summary>
                  <div class="mt-2 space-y-2">
                    {#each item.reimbursements as reimbursement, index}
                      <div class="p-3 bg-gray-50 rounded-lg">
                        <div class="flex justify-between items-start">
                          <div class="flex-1">
                            <div class="flex items-center gap-2 mb-1">
                              <p class="font-medium">
                                Order #{reimbursement.orderId}
                              </p>
                              <span
                                class="text-xs px-2 py-1 rounded-full border {getStatusBadgeClass(
                                  reimbursement.status,
                                )}"
                              >
                                {getStatusDisplayText(reimbursement.status)}
                              </span>
                            </div>
                            <p class="text-sm">{reimbursement.restaurant}</p>
                            <p class="text-sm text-gray-600">
                              {formatDate(reimbursement.orderDate)}
                            </p>
                            <p class="text-sm font-medium">
                              {formatCurrency(reimbursement.amount)}
                            </p>
                          </div>
                          {#if reimbursement.status === "unpaid"}
                            <button
                              class="ml-2 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={loadingStates[reimbursement.id]}
                              onclick={() =>
                                markReimbursementAsPaid(reimbursement.id)}
                            >
                              {loadingStates[reimbursement.id]
                                ? "Processing..."
                                : "Mark Paid"}
                            </button>
                          {/if}
                        </div>
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
              <div class="border border-gray-200 p-4 rounded-lg">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="font-medium">{item.user.name}</h3>
                    <p class="text-sm text-gray-600">{item.user.email}</p>
                    <div class="flex gap-2 mt-2">
                      <span
                        class="text-xs px-2 py-1 rounded-full border {areAllReimbursementsPaid(
                          item.reimbursements,
                        )
                          ? 'bg-green-100 text-green-800 border-green-200'
                          : 'bg-red-100 text-red-800 border-red-200'}"
                      >
                        {areAllReimbursementsPaid(item.reimbursements)
                          ? "All Paid"
                          : `${countUnpaidReimbursements(item.reimbursements)} Unpaid`}
                      </span>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-lg font-bold">
                      {formatCurrency(item.amount)}
                    </p>
                  </div>
                </div>
                <details class="mt-2">
                  <summary
                    class="cursor-pointer text-sm text-gray-700 hover:text-gray-900"
                  >
                    View {item.reimbursements.length} reimbursement(s)
                  </summary>
                  <div class="mt-2 space-y-2">
                    {#each item.reimbursements as reimbursement, index}
                      <div class="p-3 bg-gray-50 rounded-lg">
                        <div class="flex justify-between items-start">
                          <div class="flex-1">
                            <div class="flex items-center gap-2 mb-1">
                              <p class="font-medium">
                                Order #{reimbursement.orderId}
                              </p>
                              <span
                                class="text-xs px-2 py-1 rounded-full border {getStatusBadgeClass(
                                  reimbursement.status,
                                )}"
                              >
                                {getStatusDisplayText(reimbursement.status)}
                              </span>
                            </div>
                            <p class="text-sm">{reimbursement.restaurant}</p>
                            <p class="text-sm text-gray-600">
                              {formatDate(reimbursement.orderDate)}
                            </p>
                            <p class="text-sm font-medium">
                              {formatCurrency(reimbursement.amount)}
                            </p>
                          </div>
                          {#if reimbursement.status === "unpaid"}
                            <button
                              class="ml-2 px-3 py-1 bg-yellow-500 text-white text-sm rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={loadingStates[reimbursement.id]}
                              onclick={() =>
                                markReimbursementAsPaid(reimbursement.id)}
                            >
                              {loadingStates[reimbursement.id]
                                ? "Processing..."
                                : "Mark as Paid"}
                            </button>
                          {/if}
                        </div>
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
