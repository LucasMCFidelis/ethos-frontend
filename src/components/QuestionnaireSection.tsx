import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { QuestionStep, ResultStep } from "@/types/simulation";
import { useSimulation } from "@/hooks/useSimulation";

interface Props {
  onComplete: (result: ResultStep["result"]) => void;
}

export function QuestionnaireSection({ onComplete }: Props) {
  const { currentStep, answer, startMutation, answerMutation } =
    useSimulation();
  const [selected, setSelected] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  const loading = startMutation.isPending || answerMutation.isPending;

  useEffect(() => {
    if (currentStep?.finished) onComplete(currentStep.result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  useEffect(() => {
    if (currentStep && !currentStep.finished) setSelected(null);
  }, [currentStep]);

  if (!currentStep || currentStep.finished === true) return null;

  const { question } = currentStep as QuestionStep;

  const handleNext = async () => {
    if (!selected) {
      setShowError(true);
      return;
    }
    answer(question.id, selected);
  };

  const error = startMutation.isError || answerMutation.isError;

  const colsMap: Record<number, string> = {
    1: "grid-cols-1",
    2: "sm:grid-cols-2",
    3: "md:grid-cols-3",
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
      className="py-12 sm:py-16 lg:py-20 bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
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
                <p className="text-foreground text-base leading-relaxed">
                  {question.description}
                </p>
              )}
            </div>

            <div className={`grid gap-3 ${gridCols}`}>
              {question.options.map((opt) => (
                <Button
                  key={opt}
                  variant="outline"
                  className={`py-8 text-lg font-medium capitalize hover:bg-transparent ${selected === opt && "border-2 border-primary-700"}`}
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

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              className="w-full py-6 text-base"
              onClick={handleNext}
              disabled={!selected || loading}
              variant="ghost"
            >
              {loading ? "Carregando..." : "Próxima Questão"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
