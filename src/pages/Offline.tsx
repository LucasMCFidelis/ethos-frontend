import { WifiOff } from "lucide-react";
import { ErrorPage } from "@/components/ErrorPage";

export default function WiFiOff() {
  return (
    <ErrorPage
      icon={WifiOff}
      title="Sem Conexão com a Internet"
      description="Parece que você está offline. Verifique sua conexão com a internet e tente novamente."
      actionsProps={{
        primary: {
          text: "Tentar novamente",
          action: () => window.location.reload(),
        },
      }}
    />
  );
}
