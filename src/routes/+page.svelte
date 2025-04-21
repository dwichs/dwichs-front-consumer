<script>
  import Header from "$lib/components/Header.svelte";
  import Category from "$lib/components/Category.svelte";
  import Restaurant from "$lib/components/Restaurant.svelte";
</script>

<Header />
<Category />

<div class="flex gap-10">
  <Restaurant />
  <Restaurant />
  <Restaurant />
  <Restaurant />
</div>
