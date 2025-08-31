<script>
  let { children, data } = $props();
  import { page } from "$app/state";
  import "../app.css";
  import Header from "$lib/components/Header.svelte";

  const noTopBarRoutes = ["/sign-in", "/sign-up"];
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=block"
    rel="stylesheet"
  />
</svelte:head>

<div class="max-w-7xl mx-auto w-full space-y-10 font-display">
  {#if !noTopBarRoutes.includes(page.url.pathname)}
    <Header userGroups={data.userGroups} />
  {/if}
  {@render children()}
</div>
