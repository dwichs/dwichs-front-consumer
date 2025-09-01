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
    class="relative p-3 rounded border border-gray-300 shadow flex items-center justify-between gap-2"
  >
    <span>Current group: {$currentGroup}</span>

    <!-- Close button to deactivate group -->
    <button
      onclick={() => handleClick(currentGroup)}
      class="hover:text-red-500 focus:outline-none cursor-pointer flex items-center justify-center"
      aria-label="Deactivate current group"
    >
      <span class="material-symbols-outlined">close</span>
    </button>
  </div>
{/if}
