import type { PageLoad } from "./$types";
export const ssr = false;

export const load: PageLoad = async ({ fetch, params }) => {
  const response = await fetch(
    `http://localhost:3000/restaurants/${params.id}`,
  );
  const menuItems = await response.json();

  return { menuItems };
};
