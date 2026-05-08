import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Ye function complex Tailwind classes ko handle krta hay
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}