/**
 * Stores the context that triggered a 5xx redirect to /server-error,
 * so the "Tente novamente" button on that page knows what to retry.
 */
const RETRY_KEY = "ethos:serverErrorRetry";

export type RetryContext =
  | { kind: "start"; trackId: string }
  | { kind: "answer"; questionId: string; answerValue: string }
  | { kind: "loadQuestion"; questionId: string }
  | { kind: "loadAnsweredStep"; questionId: string }
  | { kind: "feedback" }
  | { kind: "unknown" };

export function saveRetryContext(ctx: RetryContext) {
  try {
    sessionStorage.setItem(RETRY_KEY, JSON.stringify(ctx));
  } catch {
    /* ignore */
  }
}

export function loadRetryContext(): RetryContext | null {
  try {
    const raw = sessionStorage.getItem(RETRY_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as RetryContext;
  } catch {
    return null;
  }
}

export function clearRetryContext() {
  try {
    sessionStorage.removeItem(RETRY_KEY);
  } catch {
    /* ignore */
  }
}
