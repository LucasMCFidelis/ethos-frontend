import { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import type { QuestionStep, ResultStep } from "@/types/simulation";
import { useSimulation } from "@/hooks/useSimulation";
import { Progress } from "../ui/progress";
import { isLastOdd } from "@/lib/utils";
import { ResetQuestionnaireModal } from "../ResetQuestionnaireModal";
import {
  CorruptedDataModal,
  LoadQuestionnaireErrorModal,
  SaveAnswersErrorModal,
} from "../feedback";
import {
  clearDraft,
  loadDraft,
  saveDraft,
} from "@/lib/questionnaireDraft";
import { useToast } from "@/hooks/use-toast";

interface Props {
  onComplete: (result: ResultStep["result"]) => void;
}

export function QuestionnaireSection({ onComplete }: Props) {
  const {
    currentStep,
    answer,
    getQuestion,
    start,
    reset,
    startMutation,
    answerMutation,
    getQuestionMutation,
    getSessionMaxQuestions,
  } = useSimulation();
  const [selected, setSelected] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [history, setHistory] = useState<
    Array<{ id: string; response: string | null }>
  >([{ id: "q1", response: null }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const { toast } = useToast();
  const draftRestoredRef = useRef(false);

  const loading =
    startMutation.isPending ||
    answerMutation.isPending ||
    getQuestionMutation.isPending;

  // Restore local draft on mount (if any)
  useEffect(() => {
    if (draftRestoredRef.current) return;
    const draft = loadDraft();
    if (!draft) return;
    draftRestoredRef.current = true;

    setHistory(draft.history);
    setHistoryIndex(draft.historyIndex);
    setSelected(draft.selected);

    const targetId =
      draft.currentQuestionId ?? draft.history[draft.historyIndex]?.id;
    if (targetId) {
      getQuestion(targetId);
      toast({
        title: "Rascunho restaurado",
        description: "Suas respostas locais foram recuperadas.",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentStep?.finished) {
      clearDraft();
      onComplete(currentStep.result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  useEffect(() => {
    if (currentStep && !currentStep.finished) {
      const step = currentStep as QuestionStep;
      const id = step.question.id;

      setHistory((prev) => {
        if (historyIndex >= prev.length - 1 && prev.at(-1)?.id !== id) {
          return [...prev, { id, response: null }];
        }
        return prev;
      });

      const localResponse =
        history[historyIndex]?.id === id
          ? history[historyIndex]?.response
          : null;

      setSelected(localResponse ?? step.savedResponse ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  // Detect "corrupted data" condition (session id present locally but server rejects it)
  const corruptedSession = useMemo(() => {
    const errMsg =
      (answerMutation.error as Error | null)?.message ||
      (getQuestionMutation.error as Error | null)?.message ||
      "";
    return /sess(ã|a)o n(ã|a)o encontrada/i.test(errMsg);
  }, [answerMutation.error, getQuestionMutation.error]);

  const [dismissedLoadError, setDismissedLoadError] = useState(false);
  const [dismissedAnswerError, setDismissedAnswerError] = useState(false);
  const [dismissedCorrupted, setDismissedCorrupted] = useState(false);

  const loadErrorOpen =
    !dismissedLoadError &&
    (startMutation.isError ||
      (getQuestionMutation.isError && !corruptedSession));
  const answerErrorOpen =
    !dismissedAnswerError && answerMutation.isError && !corruptedSession;
  const corruptedOpen = !dismissedCorrupted && corruptedSession;

  const handleRetryLoad = () => {
    setDismissedLoadError(false);
    if (startMutation.isError) {
      startMutation.reset();
      start();
    } else if (getQuestionMutation.isError) {
      const id = history[historyIndex]?.id;
      getQuestionMutation.reset();
      if (id) getQuestion(id);
    }
  };

  const handleRetryAnswer = () => {
    if (!selected) return;
    answerMutation.reset();
    setDismissedAnswerError(false);
    answer(question?.id ?? "", selected);
  };

  const handleClearAndRestart = () => {
    setDismissedCorrupted(false);
    clearDraft();
    reset();
    start();
  };

  const handleSaveDraft = () => {
    const currentId =
      currentStep && !currentStep.finished
        ? (currentStep as QuestionStep).question.id
        : history[historyIndex]?.id;

    const updatedHistory = history.map((h, i) =>
      i === historyIndex ? { ...h, response: selected } : h,
    );

    const ok = saveDraft({
      history: updatedHistory,
      historyIndex,
      selected,
      currentQuestionId: currentId,
    });

    toast({
      title: ok ? "Rascunho salvo" : "Não foi possível salvar",
      description: ok
        ? "Suas respostas foram armazenadas localmente neste dispositivo."
        : "O armazenamento local não está disponível.",
      variant: ok ? "default" : "destructive",
    });

    if (ok) setDismissedAnswerError(true);
  };

  // Always-on modals layer (rendered even when there is no currentStep yet)
  const modals = (
    <>
      <LoadQuestionnaireErrorModal
        open={loadErrorOpen}
        onOpenChange={(o) => !o && setDismissedLoadError(true)}
        onRetry={handleRetryLoad}
        retrying={startMutation.isPending || getQuestionMutation.isPending}
      />
      <SaveAnswersErrorModal
        open={answerErrorOpen}
        onOpenChange={(o) => !o && setDismissedAnswerError(true)}
        onRetry={handleRetryAnswer}
        onSaveDraft={handleSaveDraft}
        retrying={answerMutation.isPending}
      />
      <CorruptedDataModal
        open={corruptedOpen}
        onOpenChange={(o) => !o && setDismissedCorrupted(true)}
        onClearAndRestart={handleClearAndRestart}
      />
    </>
  );

  if (!currentStep || currentStep.finished === true) return modals;

  const { question } = currentStep as QuestionStep;

  const handlePrev = () => {
    if (historyIndex === 0) return;

    const prevIndex = historyIndex - 1;

    setHistory((prev) => {
      const updated = [...prev];
      updated[historyIndex] = { ...updated[historyIndex], response: selected };
      return updated;
    });

    setHistoryIndex(prevIndex);
    getQuestion(history[prevIndex].id);
  };

  const handleNext = () => {
    if (!selected) {
      setShowError(true);
      return;
    }

    setHistory((prev) => {
      const updated = [...prev];
      updated[historyIndex] = { ...updated[historyIndex], response: selected };
      return updated;
    });

    setHistoryIndex((i) => i + 1);
    answer(question.id, selected);
  };

  const sessionMaxQuestions = getSessionMaxQuestions();
  const currentQuestion = Math.min(historyIndex + 1, sessionMaxQuestions);
  const porcentagem = Math.min(
    100,
    Math.round((currentQuestion / sessionMaxQuestions) * 100),
  );

  const colsMap: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
  };
  const gridCols = colsMap[question.options.length] ?? "grid-cols-2";

  const OPTION_LABELS: Record<string, string> = {
    sim: "Sim",
    nao: "Não",
    duvida: "Há Dúvida",
  };


  return (
    <section
      id="questionnaire"
      className="flex flex-col items-center gap-6 md:gap-12 py-12 sm:py-16 lg:py-20 bg-background scroll-mt-20 md:scroll-mt-24"
    >
      <div className="w-full px-4 sm:px-6 md:max-w-3xl space-y-3">
        <ResetQuestionnaireModal/>
        <div className="flex justify-between">
          <span>
            Questão {currentQuestion} de {sessionMaxQuestions}
          </span>
          <span className="ml-auto">{porcentagem}%</span>
        </div>
        <Progress value={porcentagem} id="progress-upload" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 md:max-w-3xl">
        <Card
          style={{ borderRadius: "calc(var(--radius) + 8px)" }}
          className="bg-neutral-100"
        >
          <CardHeader className="pb-2">
            <p className="text-sm font-medium text-primary">
              Análise de Dilema Ético em Telemedicina
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h2 className="mb-3">{question.text}</h2>
              {question.description && (
                <p className="text-base leading-relaxed">
                  {question.description}
                </p>
              )}
            </div>

            <div className={`grid gap-3 ${gridCols}`}>
              {question.options.map((opt, index) => (
                <Button
                  key={opt}
                  variant="outline"
                  className={`py-8 text-lg font-medium capitalize hover:bg-transparent ${
                    selected === opt ? "border-2 border-primary-700" : ""
                  } ${isLastOdd(index, question.options.length) ? "col-span-full md:col-span-1" : ""}`}
                  onClick={() => {
                    setSelected(opt);
                    setShowError(false);
                  }}
                  aria-pressed={selected === opt}
                  disabled={loading}
                >
                  {OPTION_LABELS[opt] ?? opt}
                </Button>
              ))}
            </div>

            {showError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Por favor, responda antes de continuar.
                </AlertDescription>
              </Alert>
            )}


            <div className="flex flex-col sm:flex-row gap-4">
              {historyIndex > 0 && (
                <Button
                  variant="outline"
                  className="w-full sm:w-fit py-6 text-base font-medium"
                  onClick={handlePrev}
                  disabled={loading}
                >
                  <ChevronLeft />
                  Anterior
                </Button>
              )}
              <Button
                variant={selected ? "default" : "ghost"}
                className="w-full py-6 text-base"
                onClick={handleNext}
                disabled={!selected || loading}
              >
                {loading ? (
                  <>
                    Carregando
                    <Spinner className="ml-2" />
                  </>
                ) : currentQuestion === sessionMaxQuestions ? (
                  "Ver Análise"
                ) : (
                  "Próxima Questão"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      {modals}
    </section>
  );
}
