import { useSimulation } from "@/hooks/useSimulation";
import { QuestionnaireSection } from "./QuestionnaireSection";
import { ResultsSection } from "./ResultsSection";
import { useEffect } from "react";

export function QuizSection() {
  const { handleComplete, result, showQuestionnaire, handleRestart } =
    useSimulation();

  useEffect(() => {
    if (showQuestionnaire && !result) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document
            .getElementById("questionnaire")
            ?.scrollIntoView({ behavior: "smooth" });
        });
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showQuestionnaire]);

  useEffect(() => {
    if (result) {
      document
        .getElementById("results")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [result]);

  return (
    <>
      {showQuestionnaire && !result && (
        <QuestionnaireSection onComplete={handleComplete} />
      )}

      {result && <ResultsSection result={result} onRestart={handleRestart} />}
    </>
  );
}
