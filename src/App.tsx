import React, { useState } from 'react';
import { DocumentInput } from './components/DocumentInput';
import { SimplifiedContent } from './components/SimplifiedContent';
import { QuestionInput } from './components/QuestionInput';
import { Answer } from './components/Answer';
import { SimplifiedDocument, Question } from './types';
import { BookOpen } from 'lucide-react';
import { simplifyDocumentAPI, askQuestionAPI } from './utils/api';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [document, setDocument] = useState<SimplifiedDocument | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleDocumentSubmit = async (text: string) => {
    try {
      setIsLoading(true);
      const result = await simplifyDocumentAPI(text);
      setDocument(result);
    } catch (error) {
      console.error('Error simplifying document:', error);
      alert('文書の処理中にエラーが発生しました。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionSubmit = async (text: string) => {
    if (!document) return;

    try {
      setIsLoading(true);
      const answer = await askQuestionAPI(text, document.original);
      setQuestions([
        ...questions,
        { text, answer }
      ]);
    } catch (error) {
      console.error('Error getting answer:', error);
      alert('質問の処理中にエラーが発生しました。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <BookOpen className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            専門文書簡略化アシスタント
          </h1>
          <p className="text-gray-600">
            専門的な文書を分かりやすく説明し、質問に答えます
          </p>
        </div>

        {!document && (
          <DocumentInput
            onSubmit={handleDocumentSubmit}
            isLoading={isLoading}
          />
        )}

        {document && (
          <>
            <SimplifiedContent
              document={document}
              onQuestionSelect={handleQuestionSubmit}
            />
            <QuestionInput
              onSubmit={handleQuestionSubmit}
              isLoading={isLoading}
            />
            <Answer questions={questions} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;