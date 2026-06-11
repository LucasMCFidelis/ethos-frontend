import { useSimulation } from "@/hooks/useSimulation";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { QuestionnaireSection } from "./QuestionnaireSection";
import { ResultsSection } from "./ResultsSection";
import { useEffect, useRef } from "react";

export function QuizSection() {
  const {
    handleComplete,
    result,
    showQuestionnaire,
    handleRestart,
    currentStep,
    isRestoringDraft
  } = useSimulation();
  const { close: closeMobileMenu } = useMobileMenu();
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    if (!showQuestionnaire || result) {
      hasScrolledRef.current = false;
      return;
    }
    if (hasScrolledRef.current) return;
    if (!currentStep || currentStep.finished) return;

    closeMobileMenu();

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
    if (!result) return;

    let cancelled = false;
    const tryScroll = (attempt = 0) => {
      if (cancelled) return;
      const el = document.getElementById("results");
      if (el) {
        const header = document.querySelector("header");
        const headerHeight = header?.getBoundingClientRect().height ?? 0;
        const top =
          el.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top, behavior: "smooth" });
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
  }, [result]);

  return (
    <>
      {showQuestionnaire && !result && (currentStep || isRestoringDraft) && (
        <QuestionnaireSection onComplete={handleComplete} />
      )}

      {result && (
        <ResultsSection
          result={result}
          onRestart={() => {
            handleRestart();
            requestAnimationFrame(() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            });
          }}
        />
      )}
    </>
  );
}
