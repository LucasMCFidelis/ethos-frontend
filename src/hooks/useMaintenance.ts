import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const IS_MAINTENANCE = import.meta.env.VITE_MAINTENANCE_MODE === "true";

/**
 * Retorna um guard que redireciona para /maintenance
 * se o modo de manutenção estiver ativo.
 *
 * Uso:
 *   const { guardAction } = useMaintenance();
 *   <Button onClick={guardAction(handleStartQuiz)}>Iniciar</Button>
 */
export function useMaintenance() {
  const navigate = useNavigate();

  const guardAction = useCallback(
    <T extends unknown[]>(fn: (...args: T) => void) =>
      (...args: T) => {
        if (IS_MAINTENANCE) {
          navigate("/maintenance");
          return;
        }
        fn(...args);
      },
    [navigate],
  );

  return { isMaintenance: IS_MAINTENANCE, guardAction };
}