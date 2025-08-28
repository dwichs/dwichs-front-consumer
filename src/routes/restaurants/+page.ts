/** @type {import('./$types').PageLoad} */
import { PUBLIC_API_BASE_CLIENT } from "$env/static/public";

export async function load({ fetch }) {
  const response = await fetch(`${PUBLIC_API_BASE_CLIENT}/restaurants`);
  const restaurants = await response.json();

  return { restaurants };
}
