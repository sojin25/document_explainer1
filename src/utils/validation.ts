export function validateDocument(text: string): boolean {
  return typeof text === 'string' && text.trim().length > 0 && text.length <= 4000;
}

export function validateQuestion(text: string): boolean {
  return typeof text === 'string' && text.trim().length > 0 && text.length <= 500;
}