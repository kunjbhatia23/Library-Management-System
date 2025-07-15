import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Book, Member } from '../../types';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const schema = yup.object().shape({
  bookId: yup.string().required('Book is required'),
  memberId: yup.string().required('Member is required'),
});

interface IssueBookFormData {
  bookId: string;
  memberId: string;
}

interface IssueBookFormProps {
  books: Book[];
  members: Member[];
  onSubmit: (bookId: string, memberId: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
  booksLoading?: boolean;
  membersLoading?: boolean;
}

const IssueBookForm: React.FC<IssueBookFormProps> = ({ 
  books, 
  members, 
  onSubmit, 
  onCancel, 
  isLoading = false,
  booksLoading = false,
  membersLoading = false 
}) => {
  const isDataLoading = booksLoading || membersLoading;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IssueBookFormData>({
    resolver: yupResolver(schema),
  });

  const availableBooks = books.filter(book => book.availableCopies > 0);
  const activeMembers = members.filter(member => member.isActive);

  const handleFormSubmit = (data: IssueBookFormData) => {
    onSubmit(data.bookId, data.memberId);
    reset(); // Clear form after submission
  };

  const handleCancel = () => {
    reset(); // Clear form when canceling
    onCancel();
  };

  // Show loading spinner while data is being fetched
  if (isDataLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <LoadingSpinner />
        <p className="text-gray-600 mt-4">Loading books and members...</p>
      </div>
    );
  }

  // Show error if no books or members available
  if (availableBooks.length === 0 && activeMembers.length === 0) {
    return (
      <ErrorMessage 
        message="No available books or active members found. Please add books and members first." 
        onRetry={onCancel}
      />
    );
  }

  if (availableBooks.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">No Available Books</h3>
          <p className="text-yellow-700 mb-4">All books are currently issued. Please wait for returns or add more copies.</p>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (activeMembers.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">No Active Members</h3>
          <p className="text-yellow-700 mb-4">No active members found. Please activate members or register new ones.</p>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label htmlFor="bookId" className="block text-sm font-medium text-gray-700 mb-2">
          Select Book *
        </label>
        <select
          id="bookId"
          {...register('bookId')}
          disabled={isLoading}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.bookId ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
        >
          <option value="">Choose a book...</option>
          {availableBooks.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title} by {book.author} (Available: {book.availableCopies})
            </option>
          ))}
        </select>
        {errors.bookId && <p className="text-red-500 text-sm mt-1">{errors.bookId.message}</p>}
        {availableBooks.length === 0 && (
          <p className="text-yellow-600 text-sm mt-1">No books available for issuing</p>
        )}
      </div>

      <div>
        <label htmlFor="memberId" className="block text-sm font-medium text-gray-700 mb-2">
          Select Member *
        </label>
        <select
          id="memberId"
          {...register('memberId')}
          disabled={isLoading}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.memberId ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
        >
          <option value="">Choose a member...</option>
          {activeMembers.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name} ({member.email})
            </option>
          ))}
        </select>
        {errors.memberId && <p className="text-red-500 text-sm mt-1">{errors.memberId.message}</p>}
        {activeMembers.length === 0 && (
          <p className="text-yellow-600 text-sm mt-1">No active members available</p>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Issue Information</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Books are issued for 14 days</li>
          <li>• Late returns incur a fine of 50Rs per day</li>
          <li>• Members must be active to issue books</li>
          <li>• Available books: {availableBooks.length}</li>
          <li>• Active members: {activeMembers.length}</li>
        </ul>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={handleCancel}
          disabled={isLoading}
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || availableBooks.length === 0 || activeMembers.length === 0}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isLoading ? (
            <span className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Issuing...
            </span>
          ) : (
            'Issue Book'
          )}
        </button>
      </div>
    </form>
  );
};

export default IssueBookForm;
