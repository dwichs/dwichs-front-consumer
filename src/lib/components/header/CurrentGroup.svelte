<script>
  import { currentGroup } from "../../stores/currentGroup.js";
  import { invalidateAll } from "$app/navigation";

  function handleClick(currentGroup) {
    invalidateAll();
    currentGroup.set(null);
  }
</script>

{#if $currentGroup}
  <div
    class="relative p-2 sm:p-3 rounded border border-gray-300 shadow flex items-center justify-between gap-2"
  >
    <span class="text-sm sm:text-base truncate max-w-32 sm:max-w-none"
      >Current group: {$currentGroup}</span
    >
    <!-- Close button to deactivate group -->
    <button
      onclick={() => handleClick(currentGroup)}
      class="hover:text-red-500 focus:outline-none cursor-pointer flex items-center justify-center flex-shrink-0"
      aria-label="Deactivate current group"
    >
      <span class="material-symbols-outlined text-lg sm:text-xl">close</span>
    </button>
  </div>
{/if}
