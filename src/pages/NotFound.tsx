import { Frown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ErrorPage } from "@/components/ErrorPage";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <ErrorPage
      status={404}
      icon={Frown}
      title="Página não encontrada"
      description="Desculpe, não conseguimos encontrar a página que você está procurando. Ela pode ter sido movida, excluída ou o endereço pode ter sido digitado incorretamente."
      actionsProps={{
        secondary: {
          text: "Precisa de Ajuda?",
          action: () => navigate("/#contato"),
        },
      }}
    />
  );
}
