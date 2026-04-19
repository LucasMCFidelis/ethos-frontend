import { AlertTriangle, ServerCrash } from "lucide-react";
import { ErrorPage } from "@/components/ErrorPage";
import { useNavigate } from "react-router-dom";

export default function ServerError() {
  const navigate = useNavigate();

  return (
    <ErrorPage
      status={500}
      icon={AlertTriangle}
      title="Erro Interno do Servidor"
      description="Desculpe, algo deu errado em nossos servidores. Nossa equipe foi notificada e está trabalhando para resolver o problema. Por favor, tente novamente em alguns instantes."
      actionsProps={{
        primary: {
          text: "Tentar novamente",
          action: () => window.location.reload(),
        },
        secondary: {
          text: "Voltar para Início",
          action: () => navigate("/"),
        },
      }}
    />
  );
}
