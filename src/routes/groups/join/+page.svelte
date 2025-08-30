<script>
  import { PUBLIC_API_BASE_CLIENT } from "$env/static/public";

  let groupId = $state("");
  let isSubmitting = $state(false);
  let message = $state("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!groupId) {
      message = "Please fill in all fields";
      return;
    }

    isSubmitting = true;
    message = "";

    try {
      const response = await fetch(`${PUBLIC_API_BASE_CLIENT}/groups/join`, {
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
        const group = await response.json();
        message = group.message;
        groupId = "";
      } else {
        const error = await response.json();
        message = `Error: ${error.message || "Failed to join group"}`;
      }
    } catch (err) {
      message = "Network error. Please try again.";
    } finally {
      isSubmitting = false;
    }
  }
</script>

<form onsubmit={handleSubmit} class="max-w-sm mx-auto">
  <div class="mb-4">
    <label for="groupId" class="block mb-1 font-medium">Group groupId:</label>
    <input
      id="groupId"
      type="number"
      bind:value={groupId}
      required
      disabled={isSubmitting}
      class="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
    />
  </div>

  <button
    type="submit"
    disabled={isSubmitting}
    class="bg-yellow-500 rounded-full p-3 hover:shadow-xl border w-full cursor-pointer"
  >
    {isSubmitting ? "Joining..." : "Join Group"}
  </button>

  {#if message}
    <p class="mt-4 p-2 bg-gray-100 border border-gray-200 rounded-md">
      {message}
    </p>
  {/if}
</form>
