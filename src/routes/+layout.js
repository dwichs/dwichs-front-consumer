export const ssr = false;
/** @type {import('./$types').LayoutLoad} */
import { PUBLIC_API_BASE_CLIENT } from "$env/static/public";
import { browser } from "$app/environment";
import { redirect } from "@sveltejs/kit";

export async function load({ fetch, url }) {
  // Fetch groups from the API endpoint
  const res = await fetch(`${PUBLIC_API_BASE_CLIENT}/groups`, {
    credentials: "include",
  });

  if (!res.ok) {
    // If groups call fails and we're not on sign-in, redirect
    const publicRoutes = ["/sign-in", "/sign-up"];
    if (browser && !publicRoutes.includes(url.pathname)) {
      throw redirect(302, "/sign-in");
    }
    console.error(`Failed to fetch groups: ${res.status}`);
    const userGroups = [];
    return { userGroups };
  }

  const userGroups = await res.json();
  return {
    userGroups,
  };
}
