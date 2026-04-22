import { useMemo, useState, useEffect } from "react";
import { useSimulation } from "@/hooks/useSimulation";
import { useToast } from "@/hooks/use-toast";
import { LoadQuestionnaireErrorModal } from "./LoadQuestionnaireErrorModal";
import { SaveAnswersErrorModal } from "./SaveAnswersErrorModal";
import { CorruptedDataModal } from "./CorruptedDataModal";

/**
 * Global modals layer for simulation errors.
 * Mounted at the page level so it shows even when the QuestionnaireSection
 * is not yet rendered (e.g. when the very first /start request fails).
 */
export function SimulationFeedbackModals() {
  const {
    startMutation,
    answerMutation,
    loadQuestionFromTrackMutation,
    saveCurrentDraft,
    retryLoad,
    retryAnswer,
    clearAndRestart,
  } = useSimulation();
  const { toast } = useToast();

  const [dismissedLoadError, setDismissedLoadError] = useState(false);
  const [dismissedAnswerError, setDismissedAnswerError] = useState(false);
  const [dismissedCorrupted, setDismissedCorrupted] = useState(false);

  // Reset dismissal whenever a new error appears
  useEffect(() => {
    if (startMutation.isError || loadQuestionFromTrackMutation.isError) {
      setDismissedLoadError(false);
    }
  }, [startMutation.isError, loadQuestionFromTrackMutation.isError]);

  useEffect(() => {
    if (answerMutation.isError) setDismissedAnswerError(false);
  }, [answerMutation.isError]);

  const corruptedSession = useMemo(() => {
    const errMsg =
      (answerMutation.error as Error | null)?.message ||
      (loadQuestionFromTrackMutation.error as Error | null)?.message ||
      "";
    return /sess(ã|a)o n(ã|a)o encontrada/i.test(errMsg);
  }, [answerMutation.error, loadQuestionFromTrackMutation.error]);

  useEffect(() => {
    if (corruptedSession) setDismissedCorrupted(false);
  }, [corruptedSession]);

  const loadErrorOpen =
    !dismissedLoadError &&
    (startMutation.isError ||
      (loadQuestionFromTrackMutation.isError && !corruptedSession));
  const answerErrorOpen =
    !dismissedAnswerError && answerMutation.isError && !corruptedSession;
  const corruptedOpen = !dismissedCorrupted && corruptedSession;

  const handleSaveDraft = () => {
    const ok = saveCurrentDraft();
    toast({
      title: ok ? "Rascunho salvo" : "Não foi possível salvar",
      description: ok
        ? "Suas respostas foram armazenadas localmente neste dispositivo."
        : "O armazenamento local não está disponível.",
      variant: ok ? "default" : "destructive",
    });
    if (ok) setDismissedAnswerError(true);
  };

  return (
    <>
      <LoadQuestionnaireErrorModal
        open={loadErrorOpen}
        onOpenChange={(o) => !o && setDismissedLoadError(true)}
        onRetry={retryLoad}
        retrying={
          startMutation.isPending || loadQuestionFromTrackMutation.isPending
        }
      />
      <SaveAnswersErrorModal
        open={answerErrorOpen}
        onOpenChange={(o) => !o && setDismissedAnswerError(true)}
        onRetry={retryAnswer}
        onSaveDraft={handleSaveDraft}
        retrying={answerMutation.isPending}
      />
      <CorruptedDataModal
        open={corruptedOpen}
        onOpenChange={(o) => !o && setDismissedCorrupted(true)}
        onClearAndRestart={() => {
          setDismissedCorrupted(true);
          clearAndRestart();
        }}
      />
    </>
  );
}
