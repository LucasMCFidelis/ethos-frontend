import { createContext, useEffect, useState, type ReactNode } from "react";
import {
  MutateOptions,
  useMutation,
  type UseMutationResult,
} from "@tanstack/react-query";
import { api } from "@/lib/api";
import type {
  SimulationStep,
  QuestionStep,
  ResultStep,
} from "@/types/simulation";
import { hasDraft } from "@/lib/questionnaireDraft";

const SESSION_KEY = "ethos:sessionId";
const SESSION_MAX_QUESTIONS_KEY = "ethos:sessionMaxQuestions";

export interface FeedbackPayload {
  rate: number;
  useObjective: string;
  suggestion?: string;
}

interface FeedbackResponse {
  sessionId: string;
  rate: number;
  useObjective: string;
  suggestion?: string | null;
  createdAt: string;
}

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

  feedbackMutation: UseMutationResult<unknown, Error, FeedbackPayload>;

  start: (trackId?: string) => void;
  answer: (questionId: string, answerValue: string) => void;
  getQuestion: (questionId: string) => void;
  sendFeedback: (
    payload: FeedbackPayload,
    options?: MutateOptions<FeedbackResponse, Error, FeedbackPayload>,
  ) => void;

  getSessionMaxQuestions: () => number;
  reset: () => void;
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

function getSessionMaxQuestions() {
  return Number(localStorage.getItem(SESSION_MAX_QUESTIONS_KEY));
}

function saveSessionMaxQuestions(value: number) {
  localStorage.setItem(SESSION_MAX_QUESTIONS_KEY, `${value}`);
}

function clearSessionMaxQuestions() {
  localStorage.removeItem(SESSION_MAX_QUESTIONS_KEY);
}

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<SimulationStep | null>(null);

  const [result, setResult] = useState<ResultStep["result"] | null>(null);

  const [showQuestionnaire, setShowQuestionnaire] = useState(() => hasDraft());

  // Auto-show questionnaire on mount when a local draft exists.
  // The actual restoration of state/question is handled inside QuestionnaireSection.
  useEffect(() => {
    if (hasDraft()) {
      setShowQuestionnaire(true);
    }
  }, []);

  const startMutation = useMutation({
    mutationFn: (trackId: string) =>
      api.get<{ sessionId: string } & QuestionStep>(
        `/simulation/tracks/${trackId}/start`,
      ),

    onSuccess: (data) => {
      saveSessionId(data.sessionId);
      saveSessionMaxQuestions(data.maxQuestions);

      setCurrentStep({
        finished: false,
        question: data.question,
      });
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

      if (!sessionId) {
        throw new Error("Sessão não encontrada.");
      }

      return api.post<SimulationStep>(
        `/simulation/sessions/${sessionId}/answer`,
        {
          questionId,
          answer: answerValue,
        },
      );
    },

    onSuccess: (step) => {
      setCurrentStep(step);
    },
  });

  const getQuestionMutation = useMutation({
    mutationFn: ({ questionId }: { questionId: string }) => {
      const sessionId = getSessionId();

      if (!sessionId) {
        throw new Error("Sessão não encontrada.");
      }

      return api.get<SimulationStep>(
        `/simulation/sessions/${sessionId}/answer/${questionId}`,
      );
    },

    onSuccess: (step) => {
      setCurrentStep(step);
    },
  });

  const feedbackMutation = useMutation({
    mutationFn: (payload: FeedbackPayload) => {
      const sessionId = getSessionId();

      if (!sessionId) {
        throw new Error("Sessão não encontrada.");
      }

      return api.post(`/simulation/sessions/${sessionId}/feedback`, payload);
    },
  });

  function start(trackId = "confidencialidade") {
    startMutation.mutate(trackId);
  }

  function answer(questionId: string, answerValue: string) {
    answerMutation.mutate({
      questionId,
      answerValue,
    });
  }

  function getQuestion(questionId: string) {
    getQuestionMutation.mutate({
      questionId,
    });
  }

  function sendFeedback(
    payload: FeedbackPayload,
    options?: MutateOptions<FeedbackResponse, Error, FeedbackPayload>,
  ) {
    feedbackMutation.mutate(payload, options);
  }

  function reset() {
    clearSessionId();
    clearSessionMaxQuestions();

    setCurrentStep(null);

    startMutation.reset();
    answerMutation.reset();
    feedbackMutation.reset();
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
        getQuestionMutation,
        feedbackMutation,

        start,
        answer,
        getQuestion,
        sendFeedback,

        getSessionMaxQuestions,

        reset,
        handleStartQuiz,
        handleComplete,
        handleRestart,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}
