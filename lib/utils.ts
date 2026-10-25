import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// "John Michael Doe" -> "JD", "John" -> "J"
export function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "";
  const last = parts.length > 1 ? parts[parts.length - 1] : "";
  return (parts[0][0] + (last[0] ?? "")).toUpperCase();
}
