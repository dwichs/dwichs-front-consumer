<script>
  import Title from "./header/Title.svelte";
  import UserMenuTrigger from "./header/UserMenuTrigger.svelte";
  import GroupDropdown from "./header/GroupDropdown.svelte";

  let { userGroups } = $props();
</script>

<div class="flex justify-between pt-10 items-center">
  <div></div>
  <Title />
  <div class="flex gap-10 justify-center align-center">
    <GroupDropdown {userGroups} />
    <UserMenuTrigger />
  </div>
</div>
