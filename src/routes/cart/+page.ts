/** @type {import('./$types').PageLoad} */
import { PUBLIC_API_BASE_CLIENT } from "$env/static/public";
import { currentGroup } from "$lib/stores/currentGroup.js";
import { get } from "svelte/store";

export async function load({ fetch }) {
  const currentGroupValue = get(currentGroup);
  const url = currentGroupValue
    ? `${PUBLIC_API_BASE_CLIENT}/carts/items?groupId=${currentGroupValue}`
    : `${PUBLIC_API_BASE_CLIENT}/carts/items`;

  const response = await fetch(url, {
    credentials: "include",
  });
  const { cartItems } = await response.json();

  return { cartItems };
}
