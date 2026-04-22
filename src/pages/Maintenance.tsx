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
      title="Em manutenção"
      description="Estamos realizando melhorias no Ethos. Em breve estaremos de volta."
      actionsProps={{
        primary: {
          text: "Tentar novamente",
          action: () => window.location.reload(),
        },
      }}
    />
  );
}
