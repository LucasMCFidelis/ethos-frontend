import { FileText } from "lucide-react";

import { FeedbackDialog } from "./FeedbackDialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRetry: () => void;
  onReload?: () => void;
  retrying?: boolean;
}

export function LoadQuestionnaireErrorModal({
  open,
  onOpenChange,
  onRetry,
  onReload = () => window.location.reload(),
  retrying,
}: Props) {
  return (
    <FeedbackDialog
      open={open}
      onOpenChange={onOpenChange}
      variant="error"
      icon={FileText}
      title="Erro ao Carregar Questionário"
      description="Não foi possível carregar o questionário. Isso pode ser uma falha temporária de conexão ou do servidor."
      primaryAction={{
        label: "Tentar Novamente",
        onClick: onRetry,
        loading: retrying,
      }}
      secondaryAction={{
        label: "Recarregar Página",
        onClick: onReload,
      }}
      testId="modal-load-questionnaire-error"
    />
  );
}
