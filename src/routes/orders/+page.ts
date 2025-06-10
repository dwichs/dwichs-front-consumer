/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const response = await fetch(`/api/orders`);
  const userOrders = await response.json();

  return { userOrders };
}
