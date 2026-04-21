import { Save } from "lucide-react";

import { FeedbackDialog } from "./FeedbackDialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRetry: () => void;
  onSaveDraft?: () => void;
  retrying?: boolean;
}

export function SaveAnswersErrorModal({
  open,
  onOpenChange,
  onRetry,
  onSaveDraft,
  retrying,
}: Props) {
  return (
    <FeedbackDialog
      open={open}
      onOpenChange={onOpenChange}
      variant="error"
      icon={Save}
      title="Erro ao Salvar Respostas"
      description="Não foi possível salvar suas respostas no servidor. Suas respostas ainda estão temporariamente armazenadas. Você pode tentar enviar novamente ou salvar um rascunho local."
      primaryAction={{
        label: "Tentar Salvar Novamente",
        onClick: onRetry,
        loading: retrying,
      }}
      secondaryAction={
        onSaveDraft
          ? { label: "Salvar Rascunho Local", onClick: onSaveDraft }
          : undefined
      }
      testId="modal-save-answers-error"
    />
  );
}
