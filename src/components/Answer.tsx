import React from 'react';
import { Question } from '../types';

interface AnswerProps {
  questions: Question[];
}

export const Answer: React.FC<AnswerProps> = ({ questions }) => {
  if (questions.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 space-y-4">
      {questions.map((question, index) => (
        <div key={index} className="p-6 bg-white rounded-lg shadow-lg">
          <h4 className="font-semibold text-blue-600 mb-2">Q: {question.text}</h4>
          <p className="text-gray-700 whitespace-pre-wrap">A: {question.answer}</p>
        </div>
      ))}
    </div>
  );
};