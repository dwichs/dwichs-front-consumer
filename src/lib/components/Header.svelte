<script>
  import Title from "./header/Title.svelte";
  import UserMenuTrigger from "./header/UserMenuTrigger.svelte";
  import GroupDropdown from "./header/GroupDropdown.svelte";
  import CurrentGroup from "./header/CurrentGroup.svelte";
  import Cart from "./header/Cart.svelte";

  let { userGroups } = $props();
</script>

<div class="flex justify-center p-5">
  <Title />
  <div class="absolute flex gap-5 top-0 right-0 p-5">
    <CurrentGroup />
    <GroupDropdown {userGroups} />
    <Cart />
    <UserMenuTrigger />
  </div>
</div>
