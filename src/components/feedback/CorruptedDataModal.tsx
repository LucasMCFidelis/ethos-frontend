import { RefreshCw } from "lucide-react";

import { FeedbackDialog } from "./FeedbackDialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClearAndRestart: () => void;
  onReload?: () => void;
}

export function CorruptedDataModal({
  open,
  onOpenChange,
  onClearAndRestart,
  onReload = () => window.location.reload(),
}: Props) {
  return (
    <FeedbackDialog
      open={open}
      onOpenChange={onOpenChange}
      variant="warning"
      icon={RefreshCw}
      title="Dados Corrompidos"
      description="Os dados armazenados estão corrompidos ou em formato inválido. Para continuar, precisamos limpar esses dados e começar do zero. Suas respostas anteriores podem ser perdidas."
      primaryAction={{
        label: "Limpar Dados e Reiniciar",
        onClick: onClearAndRestart,
      }}
      secondaryAction={{
        label: "Recarregar Página",
        onClick: onReload,
      }}
      testId="modal-corrupted-data"
    />
  );
}
