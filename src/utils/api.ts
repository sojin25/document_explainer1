import axios from 'axios';
import { SimplifiedDocument, Question } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

export async function simplifyDocumentAPI(text: string): Promise<SimplifiedDocument> {
  const response = await axios.post(`${API_BASE_URL}/simplify`, { text });
  return response.data;
}

export async function askQuestionAPI(question: string, context: string): Promise<string> {
  const response = await axios.post(`${API_BASE_URL}/question`, { question, context });
  return response.data.answer;
}