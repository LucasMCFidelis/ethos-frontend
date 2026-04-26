const DRAFT_KEY = "ethos:questionnaireDraft";

export interface QuestionnaireDraft {
  history: Array<{ id: string; response: string | null }>;
  historyIndex: number;
  selected: string | null;
  currentQuestionId?: string;
  savedAt: string;
}

export function saveDraft(draft: Omit<QuestionnaireDraft, "savedAt">) {
  try {
    const payload: QuestionnaireDraft = {
      ...draft,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
}

export function loadDraft(): QuestionnaireDraft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as QuestionnaireDraft;
  } catch {
    return null;
  }
}

export function clearDraft() {
  localStorage.removeItem(DRAFT_KEY);
}

export function hasDraft(): boolean {
  return !!localStorage.getItem(DRAFT_KEY);
}
