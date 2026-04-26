import { SimulationContext } from "@/contexts/SimulationContext";
import { useContext } from "react";

export function useSimulation() {
  const ctx = useContext(SimulationContext);
  if (!ctx) {
    throw new Error("useSimulation deve ser usado dentro de <SimulationProvider>");
  }
  return ctx;
}