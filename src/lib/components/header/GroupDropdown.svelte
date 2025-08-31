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
    class="inline-flex items-center justify-center h-full w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
  >
    <span class="text-base"> Groups </span>
    <!-- SVG indicator -->
    <svg
      class="-mr-1 ml-2 h-5 w-5 text-gray-400"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
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
              class="text-gray-700 text-sm hover:underline text-left"
            >
              {group.name} #{group.id}
            </button>
          {/each}
        </div>
      </div>
    </div>
  </div>
</details>
