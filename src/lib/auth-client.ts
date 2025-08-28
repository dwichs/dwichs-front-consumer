import { createAuthClient } from "better-auth/svelte";
import { PUBLIC_API_BASE_CLIENT } from "$env/static/public";

export const authClient = createAuthClient({
  baseURL: `${PUBLIC_API_BASE_CLIENT}/api/auth`,
});
