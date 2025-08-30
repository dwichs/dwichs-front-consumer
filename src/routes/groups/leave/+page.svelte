<script>
  import { PUBLIC_API_BASE_CLIENT } from "$env/static/public";
  import { currentGroup } from "$lib/stores/currentGroup.js";

  let groupId = $state("");
  let isSubmitting = $state(false);
  let message = $state("");
  let messageType = $state(""); // "success" or "error"

  async function handleSubmit(event) {
    event.preventDefault();

    if (!groupId) {
      message = "Please fill in all fields";
      messageType = "error";
      return;
    }

    isSubmitting = true;
    message = "";
    messageType = "";

    try {
      const response = await fetch(`${PUBLIC_API_BASE_CLIENT}/groups/leave`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupId: groupId,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (groupId === $currentGroup) {
          $currentGroup = null;
        }
        message = result.message || "Successfully left the group";
        messageType = "success";
        groupId = "";
      } else {
        const error = await response.json();
        message = `Error: ${error.error || error.message || "Failed to leave group"}`;
        messageType = "error";
      }
    } catch (err) {
      console.error("Network error:", err);
      message = "Network error. Please try again.";
      messageType = "error";
    } finally {
      isSubmitting = false;
    }
  }
</script>

<form onsubmit={handleSubmit} class="max-w-sm mx-auto">
  <div class="mb-4">
    <label for="groupId" class="block mb-1 font-medium">Group ID:</label>
    <input
      id="groupId"
      type="number"
      bind:value={groupId}
      required
      disabled={isSubmitting}
      placeholder="Enter group ID to leave"
      class="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent"
    />
  </div>

  <button
    type="submit"
    disabled={isSubmitting || !groupId}
    class="bg-red-500 hover:bg-red-600 text-white rounded-full p-3 hover:shadow-xl border w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
  >
    {isSubmitting ? "Leaving..." : "Leave Group"}
  </button>

  {#if message}
    <div
      class="mt-4 p-3 rounded-md border {messageType === 'success'
        ? 'bg-green-50 border-green-200 text-green-800'
        : 'bg-red-50 border-red-200 text-red-800'}"
    >
      {message}
    </div>
  {/if}
</form>
