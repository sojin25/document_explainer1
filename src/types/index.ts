export interface SimplifiedDocument {
  original: string;
  simplified: string;
  suggestedQuestions: string[];
}

export interface Question {
  text: string;
  answer: string;
}