/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const res = await fetch(`/api`);
  const hello = await res.text();

  return { hello };
}
