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
      const books = await bookAPI.getAll();
      dispatch({ type: 'SET_BOOKS', payload: books });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load books' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addBook = async (data: BookFormData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const newBook = await bookAPI.create(data);
      dispatch({ type: 'ADD_BOOK', payload: newBook });
      return newBook;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add book' });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateBook = async (id: string, data: Partial<BookFormData>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const updatedBook = await bookAPI.update(id, data);
      dispatch({ type: 'UPDATE_BOOK', payload: updatedBook });
      return updatedBook;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update book' });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteBook = async (id: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await bookAPI.delete(id);
      dispatch({ type: 'DELETE_BOOK', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete book' });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
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