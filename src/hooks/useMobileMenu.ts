import { useContext } from "react";
import { MobileMenuContext } from "@/contexts/MobileMenuContext";

export function useMobileMenu() {
  const ctx = useContext(MobileMenuContext);
  if (!ctx) {
    throw new Error(
      "useMobileMenu must be used within a MobileMenuProvider",
    );
  }
  return ctx;
}
