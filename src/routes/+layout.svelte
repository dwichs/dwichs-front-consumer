<script>
  let { children } = $props();
  import "../app.css";
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"
  />
</svelte:head>

<div class="max-w-7xl mx-auto w-full">
  {@render children()}
</div>
