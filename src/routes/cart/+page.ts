/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const response = await fetch(`http://localhost:3000/cart/items`, {
    credentials: "include",
  });
  const menuItems = await response.json();

  return { menuItems };
}
