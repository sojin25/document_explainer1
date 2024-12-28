import React from 'react';
import { SimplifiedDocument } from '../types';
import { MessageSquare } from 'lucide-react';

interface SimplifiedContentProps {
  document: SimplifiedDocument;
  onQuestionSelect: (question: string) => void;
}

export const SimplifiedContent: React.FC<SimplifiedContentProps> = ({
  document,
  onQuestionSelect,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">簡略化された内容:</h3>
      <div className="prose max-w-none">
        <p className="text-gray-700 whitespace-pre-wrap">{document.simplified}</p>
      </div>

      <div className="mt-8">
        <div className="flex items-center mb-4">
          <MessageSquare className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="text-lg font-semibold">よくある質問:</h4>
        </div>
        <div className="space-y-2">
          {document.suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => onQuestionSelect(question)}
              className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};