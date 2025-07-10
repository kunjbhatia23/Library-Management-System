import { useEffect } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { bookAPI } from '../services/api';
import { BookFormData } from '../types';

export const useBooks = () => {
  const { state, dispatch } = useLibrary();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      const books = await bookAPI.getAll();
      dispatch({ type: 'SET_BOOKS', payload: books });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load books';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      console.error('Error loading books:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addBook = async (data: BookFormData) => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null });
      const newBook = await bookAPI.create(data);
      // Add the new book to the existing list
      dispatch({ type: 'ADD_BOOK', payload: newBook });
      return newBook;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add book';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      console.error('Error adding book:', error);
      throw error;
    }
  };

  const updateBook = async (id: string, data: Partial<BookFormData>) => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null });
      const updatedBook = await bookAPI.update(id, data);
      // Update the book in the existing list
      dispatch({ type: 'UPDATE_BOOK', payload: updatedBook });
      return updatedBook;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update book';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      console.error('Error updating book:', error);
      throw error;
    }
  };

  const deleteBook = async (id: string) => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null });
      await bookAPI.delete(id);
      // Remove the book from the existing list
      dispatch({ type: 'DELETE_BOOK', payload: id });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete book';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      console.error('Error deleting book:', error);
      throw error;
    }
  };

  return {
    books: state.books,
    loading: state.loading,
    error: state.error,
    loadBooks,
    addBook,
    updateBook,
    deleteBook,
  };
};