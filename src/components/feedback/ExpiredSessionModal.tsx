import { RefreshCw } from "lucide-react";

import { FeedbackDialog } from "./FeedbackDialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartNewSession: () => void;
  extendCancelAction: () => void
}

export function ExpiredSessionModal({
  open,
  onOpenChange,
  onStartNewSession,
  extendCancelAction
}: Props) {
  return (
    <FeedbackDialog
      open={open}
      onOpenChange={onOpenChange}
      variant="warning"
      icon={RefreshCw}
      title="Sessão Expirada"
      description="Sua sessão expirou após 30 minutos de inatividade por motivos de segurança. Você precisa iniciar um novo questionário."
      primaryAction={{
        label: "Iniciar Novo Questionário",
        onClick: onStartNewSession,
      }}
      cancelLabel="Fechar"
      extendCancelAction={extendCancelAction}
      testId="modal-corrupted-data"
    />
  );
}
