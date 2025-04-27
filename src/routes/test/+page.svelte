<script>
  /** @type {import('./$types').PageProps} */
  let { data } = $props();
  console.log(data.hello);
</script>

<h1>hello</h1>
<p>{data.hello}</p>
