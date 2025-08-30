<script>
  let name = $state("");
  let ownerId = $state("");
  let isSubmitting = $state(false);
  let message = $state("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!name || !ownerId) {
      message = "Please fill in all fields";
      return;
    }

    isSubmitting = true;
    message = "";

    try {
      const response = await fetch("/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          ownerId: ownerId.trim(),
        }),
      });

      if (response.ok) {
        const group = await response.json();
        message = `Group "${group.name}" created successfully!`;
        name = "";
        ownerId = "";
      } else {
        const error = await response.json();
        message = `Error: ${error.message || "Failed to create group"}`;
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
    <label for="name" class="block mb-1 font-medium">Group Name:</label>
    <input
      id="name"
      type="text"
      bind:value={name}
      required
      disabled={isSubmitting}
      class="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
    />
  </div>

  <div class="mb-4">
    <label for="ownerId" class="block mb-1 font-medium">Owner ID:</label>
    <input
      id="ownerId"
      type="text"
      bind:value={ownerId}
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
    {isSubmitting ? "Creating..." : "Create Group"}
  </button>

  {#if message}
    <p class="mt-4 p-2 bg-gray-100 border border-gray-200 rounded-md">
      {message}
    </p>
  {/if}
</form>
