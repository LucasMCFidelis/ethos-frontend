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
import { clearDraft, hasDraft, saveDraft } from "@/lib/questionnaireDraft";
import { useNavigate } from "react-router-dom";
import { IS_MAINTENANCE } from "@/hooks/useMaintenance";
import { ApiError } from "@/lib/api";
import {
  clearRetryContext,
  loadRetryContext,
  saveRetryContext,
  type RetryContext,
} from "@/lib/serverErrorRetry";

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

export interface QuestionnaireHistoryEntry {
  id: string;
  response: string | null;
}

interface SimulationContextValue {
  currentStep: SimulationStep | null;
  result: ResultStep["result"] | null;
  showQuestionnaire: boolean;
  isRestoringDraft: boolean;
  finishDraftRestore: () => void;

  // Shared questionnaire state (used by section + global modals)
  history: QuestionnaireHistoryEntry[];
  historyIndex: number;
  selected: string | null;
  setHistory: React.Dispatch<React.SetStateAction<QuestionnaireHistoryEntry[]>>;
  setHistoryIndex: React.Dispatch<React.SetStateAction<number>>;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;

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

  loadQuestionFromTrackMutation: UseMutationResult<
    QuestionStep["question"],
    Error,
    { questionId: string }
  >;

  loadAnsweredStepMutation: UseMutationResult<
    SimulationStep,
    Error,
    { questionId: string }
  >;

  feedbackMutation: UseMutationResult<unknown, Error, FeedbackPayload>;

  start: (trackId?: string) => void;
  answer: (questionId: string, answerValue: string) => void;
  loadQuestionFromTrack: (
    questionId: string,
  ) => Promise<QuestionStep["question"]>;
  loadAnsweredStep: (questionId: string) => Promise<SimulationStep>;
  sendFeedback: (
    payload: FeedbackPayload,
    options?: MutateOptions<FeedbackResponse, Error, FeedbackPayload>,
  ) => void;

  getSessionMaxQuestions: () => number;
  reset: () => void;
  handleStartQuiz: () => void;
  handleComplete: (r: ResultStep["result"]) => void;
  handleRestart: () => void;

  // Shared actions for modals
  saveCurrentDraft: () => boolean;
  retryLoad: () => void;
  retryAnswer: () => void;
  clearAndRestart: () => void;
  retryFromServerError: () => void;
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
  return Number(localStorage.getItem(SESSION_MAX_QUESTIONS_KEY) ?? 0);
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
  const [isRestoringDraft, setIsRestoringDraft] = useState(() => hasDraft());

  // Shared questionnaire state
  const [history, setHistory] = useState<QuestionnaireHistoryEntry[]>([
    { id: "q1", response: null },
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const navigate = useNavigate();

  // Auto-show questionnaire on mount when a local draft exists.
  // The actual restoration of state/question is handled inside QuestionnaireSection.
  useEffect(() => {
    const draftExists = hasDraft();

    if (draftExists) {
      setShowQuestionnaire(true);
      setIsRestoringDraft(true);
    }
  }, []);

  function isServerError(err: unknown): boolean {
    return err instanceof ApiError && err.status >= 500;
  }

  function handleServerError(ctx: RetryContext) {
    // Persist a draft so the user does not lose progress.
    try {
      saveCurrentDraft();
    } catch {
      /* ignore */
    }
    saveRetryContext(ctx);
    navigate("/server-error");
  }

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
    onError: (error, trackId) => {
      if (isServerError(error)) handleServerError({ kind: "start", trackId });
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

  const loadQuestionFromTrackMutation = useMutation({
    mutationFn: ({ questionId }: { questionId: string }) =>
      api.get<QuestionStep["question"]>(
        `/simulation/tracks/confidencialidade/questions/${questionId}`,
      ),

    onSuccess: (question) => {
      setCurrentStep({
        finished: false,
        question: {
          ...question,
          options: Object.keys(question.options),
        },
      });
    },
  });

  const loadAnsweredStepMutation = useMutation({
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

  async function loadQuestionFromTrack(questionId: string) {
    return await loadQuestionFromTrackMutation.mutateAsync({
      questionId,
    });
  }

  async function loadAnsweredStep(questionId: string) {
    return await loadAnsweredStepMutation.mutateAsync({
      questionId,
    });
  }

  function finishDraftRestore() {
    setIsRestoringDraft(false);
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
    clearDraft();

    setCurrentStep(null);
    setHistory([{ id: "q1", response: null }]);
    setHistoryIndex(0);
    setSelected(null);

    startMutation.reset();
    answerMutation.reset();
    loadQuestionFromTrackMutation.reset();
    loadAnsweredStepMutation.reset();
    feedbackMutation.reset();
  }

  function handleStartQuiz() {
    if (IS_MAINTENANCE) {
      navigate("/maintenance");
      return;
    }
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

  function saveCurrentDraft() {
    const currentId =
      currentStep && !currentStep.finished
        ? (currentStep as QuestionStep).question.id
        : history[historyIndex]?.id;

    const updatedHistory = history.map((h, i) =>
      i === historyIndex ? { ...h, response: selected } : h,
    );

    return saveDraft({
      history: updatedHistory,
      historyIndex,
      selected,
      currentQuestionId: currentId,
    });
  }

  function retryLoad() {
    if (startMutation.isError) {
      startMutation.reset();
      start();
    } else if (loadQuestionFromTrackMutation.isError) {
      const id = history[historyIndex]?.id;
      loadQuestionFromTrackMutation.reset();
      if (id) loadQuestionFromTrack(id);
    }
  }

  function retryAnswer() {
    if (!selected) return;
    const questionId =
      currentStep && !currentStep.finished
        ? (currentStep as QuestionStep).question.id
        : history[historyIndex]?.id;
    if (!questionId) return;
    answerMutation.reset();
    answer(questionId, selected);
  }

  function clearAndRestart() {
    clearDraft();
    reset();
    setShowQuestionnaire(true);
    start();
  }

  return (
    <SimulationContext.Provider
      value={{
        currentStep,
        result,
        showQuestionnaire,
        isRestoringDraft,
        finishDraftRestore,

        history,
        historyIndex,
        selected,
        setHistory,
        setHistoryIndex,
        setSelected,

        startMutation,
        answerMutation,
        loadQuestionFromTrackMutation,
        loadAnsweredStepMutation,
        feedbackMutation,

        start,
        answer,
        loadQuestionFromTrack,
        loadAnsweredStep,
        sendFeedback,

        getSessionMaxQuestions,

        reset,
        handleStartQuiz,
        handleComplete,
        handleRestart,

        saveCurrentDraft,
        retryLoad,
        retryAnswer,
        clearAndRestart,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}
