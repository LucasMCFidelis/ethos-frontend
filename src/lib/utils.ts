import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isLastOdd(index: number, length: number) {
  return index === length - 1 && length % 2 !== 0;
}
