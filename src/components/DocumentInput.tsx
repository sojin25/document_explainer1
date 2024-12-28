import React, { useState } from 'react';
import { FileText } from 'lucide-react';

interface DocumentInputProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

export const DocumentInput: React.FC<DocumentInputProps> = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <FileText className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold">専門文書を入力してください</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="ここに専門文書を入力してください..."
        />
        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className={`mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors
            ${(isLoading || !text.trim()) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? '処理中...' : '簡略化する'}
        </button>
      </form>
    </div>
  );
};