import React from 'react';
import { Book } from '../../types';
import { Edit, Trash2, BookOpen } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="aspect-w-16 aspect-h-9 bg-gray-100">
        <img
          src={book.coverUrl || 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400'}
          alt={book.title}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-1">by {book.author}</p>
        <p className="text-gray-500 text-sm mb-2">{book.genre}</p>
        
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm">
            <span className="text-gray-500">Available:</span>
            <span className={`ml-1 font-medium ${book.availableCopies > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {book.availableCopies}/{book.totalCopies}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <BookOpen className="h-4 w-4 mr-1" />
            {book.isbn}
          </div>
        </div>
        
        {book.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{book.description}</p>
        )}
        
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            Published: {new Date(book.publishedDate).toLocaleDateString()}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(book)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit book"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(book.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete book"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;