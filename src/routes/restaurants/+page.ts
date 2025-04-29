/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const response = await fetch(`/api/restaurants`);
  const restaurants = await response.json();

  return { restaurants };
}
