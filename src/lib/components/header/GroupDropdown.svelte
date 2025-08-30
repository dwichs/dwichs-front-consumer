<script>
  const { userGroups } = $props();

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
    Groups
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
    class="dropdown-content absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
  >
    <div class="py-1">
      <div class="p-3 space-y-3">
        <h3>Actions :</h3>
        <hr />
      </div>
      <a
        href="/groups/create"
        class="text-gray-700 block px-4 py-2 text-sm hover:underline"
      >
        Create Group
      </a>
      <a
        href="/groups/join"
        class="text-gray-700 block px-4 py-2 text-sm hover:underline"
      >
        Join Group
      </a>
      <a
        href="/groups/leave"
        class="text-gray-700 block px-4 py-2 text-sm hover:underline"
      >
        Leave Group
      </a>
      {#if userGroups.groups.length}
        <div class="p-3 space-y-3">
          <h3>Groups :</h3>
          <hr />
        </div>
      {/if}

      {#each userGroups.groups as group (group.id)}
        <a
          href={`/groups/${group.id}`}
          class="text-gray-700 block px-4 py-2 text-sm hover:underline"
        >
          {group.name} #{group.id}
        </a>
      {/each}
    </div>
  </div>
</details>
