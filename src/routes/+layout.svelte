<script>
  let { children } = $props();
  import "../app.css";
  import Header from "$lib/components/Header.svelte";
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"
  />
</svelte:head>

<div class="max-w-7xl mx-auto w-full space-y-10 font-display">
  <Header />
  {@render children()}
</div>
