export interface QuestionStep {
  finished: false;
  question: {
    id: string;
    text: string;
    description?: string;
    options: string[];
  };
  maxQuestions?: number;
  savedResponse?: string;
}

export interface ResultStep {
  finished: true;
  result: {
    key: string;
    label: string;
    description: string;
    action_type: string;
    level: string;
    actions: string[];
    fonts?: Array<{ label: string; url?: string }>;
  };
}

export type SimulationStep = QuestionStep | ResultStep;
