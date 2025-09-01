import type { PageLoad } from "./$types";
import { PUBLIC_API_BASE_CLIENT } from "$env/static/public";

export async function load({ fetch }) {
  try {
    const response = await fetch(`${PUBLIC_API_BASE_CLIENT}/reimbursements`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return {
      reimbursements: result.success ? result.data : null,
      error: result.success ? null : result.error,
    };
  } catch (error) {
    console.error("Error fetching reimbursements:", error);
    return {
      reimbursements: null,
      error: "Failed to load reimbursements",
    };
  }
}
