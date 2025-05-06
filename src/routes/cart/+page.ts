/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const response = await fetch(`/api/cart`);
  const cart = await response.json();

  return { cart };
}
