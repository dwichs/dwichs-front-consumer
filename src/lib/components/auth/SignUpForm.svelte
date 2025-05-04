<script lang="ts">
  import { goto } from "$app/navigation";
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
    } else {
      goto("/restaurants");
    }
  }
</script>

<div class="space-y-20 w-full">
  <h1
    class="text-center text-6xl underline decoration-yellow-500 underline-offset-20 decoration-dotted"
  >
    Créez votre compte.
  </h1>

  <form
    on:submit|preventDefault={handleSignup}
    class="flex flex-col text-3xl gap-5"
  >
    <input
      bind:value={firstName}
      placeholder="Prénom"
      class="border border-gray-400 p-4 rounded-2xl"
      required
    />
    <input
      bind:value={lastName}
      placeholder="Nom"
      required
      class="border border-gray-400 p-4 rounded-2xl"
    />
    <input
      type="email"
      bind:value={email}
      placeholder="Mail"
      required
      class="border border-gray-400 p-4 rounded-2xl"
    />
    <input
      type="password"
      bind:value={password}
      placeholder="Mot de passe"
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
        {#if loading}Création du compte...{:else}Créer mon compte{/if}
      </button>

      <a
        href="/sign-in"
        class="w-full rounded-full border py-2 px-4 hover:scale-105 hover:shadow-xl transition ease-in-out"
      >
        J'ai déjà un compte
      </a>
    </div>
    {#if error}
      <p class="bg-red-500">{error}</p>
    {/if}
  </form>
</div>
