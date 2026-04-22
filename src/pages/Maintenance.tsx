import { Wrench } from "lucide-react";
import { ErrorPage } from "@/components/ErrorPage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IS_MAINTENANCE } from "@/hooks/useMaintenance";

export default function Maintenance() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!IS_MAINTENANCE) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <ErrorPage
      icon={Wrench}
      title="Manutenção em Andamento"
      description="Estamos realizando uma manutenção programada para melhorar nossos serviços. Voltaremos em breve! Tempo estimado: algumas horas."
      actionsProps={{
        primary: {
          text: "Atualizar Página",
          action: () => window.location.reload(),
        },
        secondary: {
          text: "Saiba Mais",
          action: () => {},
        },
      }}
    />
  );
}
