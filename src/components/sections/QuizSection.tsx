import { useSimulation } from "@/hooks/useSimulation";
import { QuestionnaireSection } from "./QuestionnaireSection";
import { ResultsSection } from "./ResultsSection";
import { useEffect, useRef } from "react";

export function QuizSection() {
  const { handleComplete, result, showQuestionnaire, handleRestart, currentStep } =
    useSimulation();
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    if (!showQuestionnaire || result) {
      hasScrolledRef.current = false;
      return;
    }
    if (hasScrolledRef.current) return;
    if (!currentStep || currentStep.finished) return;

    let cancelled = false;
    const tryScroll = (attempt = 0) => {
      if (cancelled || hasScrolledRef.current) return;
      const el = document.getElementById("questionnaire");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        hasScrolledRef.current = true;
        return;
      }
      if (attempt < 20) {
        requestAnimationFrame(() => tryScroll(attempt + 1));
      }
    };
    tryScroll();

    return () => {
      cancelled = true;
    };
  }, [showQuestionnaire, currentStep, result]);

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
