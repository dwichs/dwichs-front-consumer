<script>
  let { children } = $props();
  import "../app.css";
</script>

<div class="max-w-7xl mx-auto w-full">
  {@render children()}
</div>
