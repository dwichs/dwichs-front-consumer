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

<button
  onclick={handleSignOut}
  class="bg-red-500 hover:scale-105 transition ease-in-out rounded-full p-3 hover:shadow-xl border w-full cursor-pointer"
  >Sign Out</button
>
