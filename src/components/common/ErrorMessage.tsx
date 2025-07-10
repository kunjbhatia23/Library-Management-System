import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center mb-4">
          <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
          <h3 className="text-lg font-semibold text-red-800">Error</h3>
        </div>
        <p className="text-red-700 mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center justify-center w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;