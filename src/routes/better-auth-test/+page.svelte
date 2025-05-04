<script lang="ts">
  import { authClient } from "$lib/auth-client";

  let firstName = "john";
  let lastName = "doe";

  let name: string = `${firstName} ${lastName}`;
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
    });

    console.log(data);
    console.log(err);

    loading = false;

    if (err) {
      console.log("error");
    }
  }

  async function handleSignOut() {
    const { data, error } = await authClient.signOut();

    console.log(data);
    console.log(error);
  }

  async function handleSignIn() {
    const { data, error: err } = await authClient.signIn.email({
      email,
      password,
    });

    console.log(data);
    console.log(err);

    loading = false;

    if (err) {
      console.log("error");
    }
  }

  async function handleDelete() {
    const { data, error } = await authClient.deleteUser();

    console.log(data);
    console.log(error);
  }
</script>

<h2>Sign up</h2>

<form on:submit|preventDefault={handleSignup} class="flex flex-col gap-3">
  <input bind:value={firstName} placeholder="firstName" required />
  <input bind:value={lastName} placeholder="lastName" required />
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

<hr />

<h2>Sign out</h2>

<button on:click={handleSignOut} class="bg-gray-100 rounded-2xl p-3">
  Sign Out
</button>

<hr />

<h2>Sign in</h2>

<form on:submit|preventDefault={handleSignIn} class="flex flex-col gap-3">
  <input type="email" bind:value={email} placeholder="Email" required />
  <input
    type="password"
    bind:value={password}
    placeholder="Password"
    minlength="8"
    required
  />
  <button type="submit" disabled={loading} class="bg-gray-100 rounded-2xl p-3">
    {#if loading}Signing in…{:else}Sign in{/if}
  </button>
  {#if error}
    <p class="error">{error}</p>
  {/if}
</form>

<h2>Delete user</h2>

<button on:click={handleDelete} class="bg-red-500 rounded-2xl p-3">
  Delete user
</button>
