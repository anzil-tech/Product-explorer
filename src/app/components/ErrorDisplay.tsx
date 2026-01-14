import { AlertTriangle } from 'lucide-react';
import React from 'react';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg">
      <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
      <p className="text-red-700 font-medium mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}