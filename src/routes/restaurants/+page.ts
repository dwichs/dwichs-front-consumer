export const ssr = false;
/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const response = await fetch(`http://localhost:3000/restaurants`);
  console.log(response);
  const restaurants = await response.json();

  return { restaurants };
}
