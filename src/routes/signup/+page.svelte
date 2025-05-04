<script lang="ts">
  import { authClient } from "$lib/auth-client";
  import { goto } from "$app/navigation";

  let name: string = "test";
  let email: string = "test@test.com";
  let password: string = "Karichi25@";
  let error: string | null = null;
  let loading = false;

  async function handleSignup() {
    loading = true;

    const { data, error: err } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "/", // where to go after email verification
    });

    console.log(data);
    console.log(err);

    loading = false;

    if (err) {
      console.log("error");
    } else {
      goto("/dashboard");
    }
  }
</script>

<form on:submit|preventDefault={handleSignup} class="flex flex-col gap-3">
  <input bind:value={name} placeholder="Name" required />
  <input type="email" bind:value={email} placeholder="Email" required />
  <input
    type="password"
    bind:value={password}
    placeholder="Password"
    minlength="8"
    required
  />
  <button type="submit" disabled={loading} class="bg-gray-100 rounded-2xl p-3">
    {#if loading}Signing up…{:else}Sign Up{/if}
  </button>
  {#if error}
    <p class="error">{error}</p>
  {/if}
</form>
