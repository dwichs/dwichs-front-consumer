import { writable } from "svelte/store";
import { browser } from "$app/environment";

// Load from localStorage or default to null
const stored = browser ? localStorage.getItem("currentGroup") : null;
const initial = stored ? JSON.parse(stored) : null;

export const currentGroup = writable(initial);

// Auto-save to localStorage whenever the store changes
if (browser) {
  currentGroup.subscribe((value) => {
    if (value === null) {
      localStorage.removeItem("currentGroup");
    } else {
      localStorage.setItem("currentGroup", JSON.stringify(value));
    }
  });
}
