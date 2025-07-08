import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useBooks } from '../../hooks/useBooks';
import { useMembers } from '../../hooks/useMembers';

const schema = yup.object().shape({
  bookId: yup.string().required('Book is required'),
  memberId: yup.string().required('Member is required'),
});

interface IssueBookFormData {
  bookId: string;
  memberId: string;
}

interface IssueBookFormProps {
  onSubmit: (bookId: string, memberId: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const IssueBookForm: React.FC<IssueBookFormProps> = ({ onSubmit, onCancel, isLoading }) => {
  const { books } = useBooks();
  const { members } = useMembers();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueBookFormData>({
    resolver: yupResolver(schema),
  });

  const availableBooks = books.filter(book => book.availableCopies > 0);
  const activeMembers = members.filter(member => member.isActive);

  const handleFormSubmit = (data: IssueBookFormData) => {
    onSubmit(data.bookId, data.memberId);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label htmlFor="bookId" className="block text-sm font-medium text-gray-700 mb-2">
          Select Book *
        </label>
        <select
          id="bookId"
          {...register('bookId')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Choose a book...</option>
          {availableBooks.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title} by {book.author} (Available: {book.availableCopies})
            </option>
          ))}
        </select>
        {errors.bookId && <p className="text-red-500 text-sm mt-1">{errors.bookId.message}</p>}
      </div>

      <div>
        <label htmlFor="memberId" className="block text-sm font-medium text-gray-700 mb-2">
          Select Member *
        </label>
        <select
          id="memberId"
          {...register('memberId')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Choose a member...</option>
          {activeMembers.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name} ({member.email})
            </option>
          ))}
        </select>
        {errors.memberId && <p className="text-red-500 text-sm mt-1">{errors.memberId.message}</p>}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Issue Information</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Books are issued for 14 days</li>
          <li>• Late returns incur a fine of $0.50 per day</li>
          <li>• Members must be active to issue books</li>
        </ul>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Issuing...' : 'Issue Book'}
        </button>
      </div>
    </form>
  );
};

export default IssueBookForm;