<script lang="ts">
  import { goto } from "$app/navigation";
  import { authClient } from "$lib/auth-client";
  let firstName = $state("john");
  let lastName = $state("doe");
  let email = $state("test@test.com");
  let password = $state("Karichi25@");
  let error = $state<string | null>(null);
  let loading = $state(false);
  // Derived state that automatically updates when firstName or lastName changes
  let name = $derived(`${firstName} ${lastName}`);
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
      error = err.message || "An error occurred during signup";
    } else {
      goto("/restaurants");
    }
  }
</script>

<div class="space-y-20 w-full">
  <h1
    class="text-center text-6xl underline decoration-yellow-500 underline-offset-20 decoration-dotted"
  >
    Sign up
  </h1>
  <form onsubmit={handleSignup} class="flex flex-col text-3xl gap-5">
    <input
      bind:value={firstName}
      placeholder="First name"
      class="border border-gray-400 p-4 rounded-2xl"
      required
    />
    <input
      bind:value={lastName}
      placeholder="Last name"
      required
      class="border border-gray-400 p-4 rounded-2xl"
    />
    <input
      type="email"
      bind:value={email}
      placeholder="Email"
      required
      class="border border-gray-400 p-4 rounded-2xl"
    />
    <input
      type="password"
      bind:value={password}
      placeholder="Password"
      minlength="8"
      required
      class="border border-gray-400 p-4 rounded-2xl"
    />
    <div class="flex w-full text-center gap-5">
      <button
        type="submit"
        disabled={loading}
        class="bg-yellow-500 hover:scale-105 transition ease-in-out rounded-full p-3 hover:shadow-xl border w-full cursor-pointer"
      >
        {loading ? "Creating account..." : "Create my account"}
      </button>
      <a
        href="/sign-in"
        class="w-full rounded-full border py-2 px-4 hover:scale-105 hover:shadow-xl transition ease-in-out"
      >
        I already have an account
      </a>
    </div>
    {#if error}
      <p class="bg-red-500 text-white p-2 rounded">{error}</p>
    {/if}
  </form>
</div>
