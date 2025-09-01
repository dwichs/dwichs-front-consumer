import type { PageLoad } from "./$types";
import { PUBLIC_API_BASE_CLIENT } from "$env/static/public";

export const load: PageLoad = async ({ fetch }) => {
  const response = await fetch(`${PUBLIC_API_BASE_CLIENT}/orders`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch order history");
  }

  const result = await response.json();
  return { orders: result.data }; // Access the 'data' property
};
