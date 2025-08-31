<script>
  import { currentGroup } from "../../stores/currentGroup.js";
</script>

{#if $currentGroup}
  <div
    class="relative p-3 rounded border border-gray-300 text-gray-700 shadow inline-flex items-center space-x-2"
  >
    <span>Current group: {$currentGroup}</span>
    <!-- Close button to deactivate group -->
    <button
      on:click={() => currentGroup.set(null)}
      class=" text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
      aria-label="Deactivate current group"
    >
      <!-- SVG icon (Heroicons mini) styled by Tailwind -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="size-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
{/if}
