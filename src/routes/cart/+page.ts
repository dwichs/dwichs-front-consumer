/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const response = await fetch(`/api/cart/items`);
  const menuItems = await response.json();

  return { menuItems };
}
