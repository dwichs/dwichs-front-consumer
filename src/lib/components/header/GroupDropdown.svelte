<script>
  const { userGroups } = $props();
  import { currentGroup } from "$lib/stores/currentGroup.js";
  import { invalidateAll } from "$app/navigation";

  function closeDropdown() {
    document.getElementById("dropdown").removeAttribute("open");
  }

  function handleGroupSelect(groupId) {
    $currentGroup = groupId;
    invalidateAll(); // or invalidate('/api/my-data');
    closeDropdown();
  }

  document.addEventListener("click", (event) => {
    const dropdown = document.getElementById("dropdown");
    if (!dropdown.contains(event.target)) {
      dropdown.removeAttribute("open");
    }
  });
  document.addEventListener("click", (event) => {
    if (event.target.tagName === "A" && event.target.closest("#dropdown")) {
      document.getElementById("dropdown").removeAttribute("open");
    }
  });
</script>

<details class="relative inline-block text-left" id="dropdown">
  <summary
    class="relative p-3 rounded cursor-pointer border border-gray-300 shadow flex items-center justify-between gap-2"
  >
    <span class="text-base"> Groups </span>
    <span class="material-symbols-outlined"> keyboard_arrow_down </span>
  </summary>
  <div
    class="dropdown-content p-3 absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg border border-gray-300 focus:outline-none"
  >
    <div class="space-y-10">
      <div class="space-y-5">
        <!-- actions -->
        <div class="space-y-3">
          <h3>Actions :</h3>
          <hr />
        </div>
        <div class="flex flex-col gap-5">
          <a
            href="/groups/create"
            class="text-gray-700 text-sm hover:underline"
          >
            Create Group
          </a>
          <a href="/groups/join" class="text-gray-700 text-sm hover:underline">
            Join Group
          </a>
          <a href="/groups/leave" class="text-gray-700 text-sm hover:underline">
            Leave Group
          </a>
        </div>
      </div>
      <div class="space-y-5">
        {#if userGroups.groups.length}
          <!-- groups -->
          <div class="space-y-3">
            <h3>Groups :</h3>
            <hr />
          </div>
        {/if}
        <div class="flex flex-col gap-5">
          {#each userGroups.groups as group (group.id)}
            <button
              onclick={() => handleGroupSelect(group.id)}
              class="text-gray-700 text-sm hover:underline text-left cursor-pointer"
            >
              {group.name} #{group.id}
            </button>
          {/each}
        </div>
      </div>
    </div>
  </div>
</details>
