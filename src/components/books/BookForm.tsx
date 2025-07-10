import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Book, BookFormData } from '../../types';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author is required'),
  genre: yup.string().required('Genre is required'),
  isbn: yup.string().required('ISBN is required'),
  publishedDate: yup.string().required('Published date is required'),
  totalCopies: yup.number().positive('Total copies must be positive').required('Total copies is required'),
  description: yup.string(),
});

interface BookFormProps {
  book?: Book;
  onSubmit: (data: BookFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const BookForm: React.FC<BookFormProps> = ({ book, onSubmit, onCancel, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: yupResolver(schema),
    defaultValues: book ? {
      title: book.title,
      author: book.author,
      genre: book.genre,
      isbn: book.isbn,
      publishedDate: book.publishedDate,
      totalCopies: book.totalCopies,
      description: book.description || '',
    } : undefined,
  });

  const genres = [
    'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Science Fiction', 
    'Fantasy', 'Biography', 'History', 'Science', 'Technology', 'Business'
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          id="title"
          {...register('title')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter book title"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
          Author *
        </label>
        <input
          id="author"
          {...register('author')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter author name"
        />
        {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
      </div>

      <div>
        <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
          Genre *
        </label>
        <select
          id="genre"
          {...register('genre')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select genre</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>}
      </div>

      <div>
        <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-1">
          ISBN *
        </label>
        <input
          id="isbn"
          {...register('isbn')}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.isbn ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="Enter ISBN"
        />
        {errors.isbn && <p className="text-red-500 text-sm mt-1">{errors.isbn.message}</p>}
      </div>

      <div>
        <label htmlFor="publishedDate" className="block text-sm font-medium text-gray-700 mb-1">
          Published Date *
        </label>
        <input
          id="publishedDate"
          type="date"
          {...register('publishedDate')}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.publishedDate ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
        />
        {errors.publishedDate && <p className="text-red-500 text-sm mt-1">{errors.publishedDate.message}</p>}
      </div>

      <div>
        <label htmlFor="totalCopies" className="block text-sm font-medium text-gray-700 mb-1">
          Total Copies *
        </label>
        <input
          id="totalCopies"
          type="number"
          min="1"
          {...register('totalCopies')}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.totalCopies ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="Enter total copies"
        />
        {errors.totalCopies && <p className="text-red-500 text-sm mt-1">{errors.totalCopies.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          {...register('description')}
          rows={3}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="Enter book description"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
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
          {isLoading ? 'Saving...' : book ? 'Update Book' : 'Add Book'}
        </button>
      </div>
    </form>
  );
};

export default BookForm;