import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {
  const response = await fetch(`/api/restaurants/${params.id}`);
  const menuItems = await response.json();

  return { menuItems };
};
