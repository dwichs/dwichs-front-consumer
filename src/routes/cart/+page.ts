/** @type {import('./$types').PageLoad} */
import { PUBLIC_API_BASE_CLIENT } from "$env/static/public";

export async function load({ fetch }) {
  const response = await fetch(`${PUBLIC_API_BASE_CLIENT}/carts/items`, {
    credentials: "include",
  });
  const menuItems = await response.json();

  return { menuItems };
}
