export interface QuestionStep {
  finished: false
  question: {
    id: string
    text: string
    description?: string
    options: string[]
  }
  savedResponse?: string
}

export interface ResultStep {
  finished: true
  result: {
    key: string
    label: string
    description: string
    action_type: string
    level: string
    actions: string[]
  }
}

export type SimulationStep = QuestionStep | ResultStep