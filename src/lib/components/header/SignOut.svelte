<script lang="ts">
  import { goto } from "$app/navigation";
  import { authClient } from "$lib/auth-client";

  let loading = false;

  async function handleSignOut() {
    loading = true;

    const { data, error: err } = await authClient.signOut();

    console.log(data);
    console.log(err);

    loading = false;

    if (err) {
      console.log("error");
    } else {
      goto("/sign-in");
    }
  }
</script>

<div class="p-2 flex items-center gap-2 group">
  <span
    class=" group-hover:bg-red-500 group-hover:text-white transition rounded-full p-1 material-symbols-outlined"
  >
    exit_to_app
  </span>
  <button onclick={handleSignOut} class="group-hover:underline cursor-pointer"
    >Sign Out</button
  >
</div>
