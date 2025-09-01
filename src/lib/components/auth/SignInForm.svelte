<script lang="ts">
  import { goto } from "$app/navigation";
  import { authClient } from "$lib/auth-client";

  let email: string = "test@test.com";
  let password: string = "Karichi25@";

  let error: string | null = null;
  let loading = false;

  async function handleSignup() {
    loading = true;

    const { data, error: err } = await authClient.signIn.email({
      email,
      password,
    });

    console.log(data);
    console.log(err);

    loading = false;

    if (err) {
      console.log("error");
    } else {
      goto("/restaurants");
    }
  }
</script>

<div class="space-y-8 lg:space-y-20 w-full">
  <h1
    class="text-center text-3xl sm:text-4xl lg:text-6xl underline decoration-yellow-500 underline-offset-8 lg:underline-offset-20 decoration-dotted"
  >
    Sign in.
  </h1>
  <form
    on:submit|preventDefault={handleSignup}
    class="flex flex-col text-lg sm:text-xl lg:text-3xl gap-4 lg:gap-5"
  >
    <input
      type="email"
      bind:value={email}
      placeholder="Email"
      required
      class="border border-gray-400 p-3 lg:p-4 rounded-2xl text-base lg:text-3xl"
    />
    <input
      type="password"
      bind:value={password}
      placeholder="Password"
      minlength="8"
      required
      class="border border-gray-400 p-3 lg:p-4 rounded-2xl text-base lg:text-3xl"
    />
    <div class="flex flex-col sm:flex-row w-full text-center gap-4 lg:gap-5">
      <a
        href="/sign-up"
        class="w-full rounded-full border py-3 lg:py-2 px-4 hover:scale-105 hover:shadow-xl transition ease-in-out text-base lg:text-3xl"
      >
        Create account
      </a>
      <button
        type="submit"
        disabled={loading}
        class="bg-yellow-500 hover:scale-105 transition ease-in-out rounded-full p-3 hover:shadow-xl border w-full cursor-pointer text-base lg:text-3xl"
      >
        {#if loading}Connecting...{:else}Sign in{/if}
      </button>
    </div>
    {#if error}
      <p class="bg-red-500 p-2 rounded text-white text-sm lg:text-base">
        {error}
      </p>
    {/if}
  </form>
</div>
