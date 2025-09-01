<script>
  import Title from "./header/Title.svelte";
  import GroupDropdown from "./header/GroupDropdown.svelte";
  import CurrentGroup from "./header/CurrentGroup.svelte";
  import Cart from "./header/Cart.svelte";
  import OrderHistory from "./header/OrderHistory.svelte";
  import Reimbursements from "./header/Reimbursements.svelte";
  import SignOut from "./header/SignOut.svelte";

  let { userGroups } = $props();
  let isOpen = $state(false);
  let dropdownRef = $state();

  function closeDropdown() {
    isOpen = false;
  }

  function handleClickOutside(event) {
    if (dropdownRef && !dropdownRef.contains(event.target)) {
      closeDropdown();
    }
  }

  $effect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  });
</script>

<div class="flex justify-between items-center p-3 sm:p-5">
  <Title />
  <div class="flex gap-2 sm:gap-5 text-gray-800">
    <div class="hidden sm:flex gap-3 lg:gap-5">
      <CurrentGroup />
      <GroupDropdown {userGroups} />
    </div>
    <div
      bind:this={dropdownRef}
      class="relative rounded border border-gray-300 shadow flex items-center justify-between gap-2 z-10"
    >
      <button
        onclick={() => (isOpen = !isOpen)}
        class="cursor-pointer p-2 sm:p-3 flex gap-2 items-center justify-between"
      >
        <span class="hidden sm:inline"> Menu </span>
        <span class="material-symbols-outlined"> menu </span>
      </button>
      {#if isOpen}
        <div
          class="absolute right-0 top-full mt-1 bg-white border border-gray-300 shadow-lg rounded min-w-48 sm:min-w-32"
        >
          <!-- Show group controls on mobile -->
          <div class="sm:hidden border-b border-gray-200 p-3">
            <CurrentGroup />
            <div class="mt-2">
              <GroupDropdown {userGroups} />
            </div>
          </div>
          <div onclick={closeDropdown}>
            <Cart />
          </div>
          <div onclick={closeDropdown}>
            <OrderHistory />
          </div>
          <div onclick={closeDropdown}>
            <Reimbursements />
          </div>
          <div onclick={closeDropdown}>
            <SignOut />
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
