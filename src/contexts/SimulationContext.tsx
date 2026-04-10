import { createContext, useState, type ReactNode } from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type {
  SimulationStep,
  QuestionStep,
  ResultStep,
} from "@/types/simulation";

const SESSION_KEY = "ethos:sessionId";

interface SimulationContextValue {
  currentStep: SimulationStep | null;
  result: ResultStep["result"] | null;
  showQuestionnaire: boolean;
  startMutation: UseMutationResult<
    { sessionId: string } & QuestionStep,
    Error,
    string
  >;
  answerMutation: UseMutationResult<
    SimulationStep,
    Error,
    { questionId: string; answerValue: string }
  >;
  getQuestionMutation: UseMutationResult<
    SimulationStep,
    Error,
    { questionId: string }
  >;
  start: (trackId?: string) => void;
  answer: (questionId: string, answerValue: string) => void;
  getQuestion: (questionId: string) => void;
  handleStartQuiz: () => void;
  handleComplete: (r: ResultStep["result"]) => void;
  handleRestart: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const SimulationContext = createContext<SimulationContextValue | null>(
  null,
);

function getSessionId() {
  return localStorage.getItem(SESSION_KEY);
}
function saveSessionId(id: string) {
  localStorage.setItem(SESSION_KEY, id);
}
function clearSessionId() {
  localStorage.removeItem(SESSION_KEY);
}

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<SimulationStep | null>(null);
  const [result, setResult] = useState<ResultStep["result"] | null>(null);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  const startMutation = useMutation({
    mutationFn: (trackId: string) =>
      api.get<{ sessionId: string } & QuestionStep>(
        `/simulation/tracks/${trackId}/start`,
      ),
    onSuccess: (data) => {
      saveSessionId(data.sessionId);
      setCurrentStep({ finished: false, question: data.question });
    },
  });

  const answerMutation = useMutation({
    mutationFn: ({
      questionId,
      answerValue,
    }: {
      questionId: string;
      answerValue: string;
    }) => {
      const sessionId = getSessionId();
      if (!sessionId)
        throw new Error("Sessão não encontrada. Reinicie a simulação.");
      return api.post<SimulationStep>(
        `/simulation/sessions/${sessionId}/answer`,
        { questionId, answer: answerValue },
      );
    },
    onSuccess: (step) => {
      setCurrentStep(step);
    },
  });

  const getQuestionMutation = useMutation({
    mutationFn: ({ questionId }: { questionId: string }) => {
      const sessionId = getSessionId();
      if (!sessionId)
        throw new Error("Sessão não encontrada. Reinicie a simulação.");
      return api.get<SimulationStep>(
        `/simulation/sessions/${sessionId}/answer/${questionId}`,
      );
    },
    onSuccess: (step) => {
      setCurrentStep(step);
    },
  });

  function start(trackId = "confiabilidade") {
    return startMutation.mutate(trackId);
  }

  function getQuestion(questionId: string) {
    return getQuestionMutation.mutate({ questionId });
  }

  function answer(questionId: string, answerValue: string) {
    return answerMutation.mutate({ questionId, answerValue });
  }

  function reset() {
    clearSessionId();
    setCurrentStep(null);
    startMutation.reset();
    answerMutation.reset();
  }

  function handleStartQuiz() {
    reset();
    setResult(null);
    setShowQuestionnaire(true);
    start();
  }

  function handleComplete(r: ResultStep["result"]) {
    setResult(r);
  }

  function handleRestart() {
    reset();
    setResult(null);
    setShowQuestionnaire(false);
  }

  return (
    <SimulationContext.Provider
      value={{
        currentStep,
        result,
        showQuestionnaire,
        startMutation,
        answerMutation,
        start,
        answer,
        handleStartQuiz,
        handleComplete,
        handleRestart,
        getQuestionMutation,
        getQuestion,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}
