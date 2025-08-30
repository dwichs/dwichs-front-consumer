export const ssr = false;
/** @type {import('./$types').LayoutLoad} */
import { PUBLIC_API_BASE_CLIENT } from "$env/static/public";

export async function load({ fetch }) {
  // Fetch groups from the API endpoint
  const res = await fetch(`${PUBLIC_API_BASE_CLIENT}/groups`, {
    credentials: "include",
  });

  if (!res.ok) {
    // Throw an HTTP error if request failed
    console.error(`Failed to fetch groups: ${res.status}`);
    const userGroups = [];
    return { userGroups };
  }

  const userGroups = await res.json();

  return {
    userGroups,
  };
}
