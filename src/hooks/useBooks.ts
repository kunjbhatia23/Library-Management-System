import { useEffect, useCallback, useMemo } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { bookAPI } from '../services/api';
import { BookFormData } from '../types';

export const useBooks = () => {
  const { state, dispatch } = useLibrary();

  // Memoize books to prevent unnecessary re-renders
  const books = useMemo(() => state.books, [state.books]);
  const loading = useMemo(() => state.loading, [state.loading]);
  const error = useMemo(() => state.error, [state.error]);

  // Memoize loadBooks function to prevent unnecessary re-renders
  const loadBooks = useCallback(async () => {
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
  }, [dispatch]);

  useEffect(() => {
    // Only load if books array is empty to prevent unnecessary API calls
    if (books.length === 0 && !loading && !error) {
      loadBooks();
    }
  }, [books.length, loading, error, loadBooks]);

  useEffect(() => {
    loadBooks();
  }, []);


  const addBook = useCallback(async (data: BookFormData) => {
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
  }, [dispatch]);

  const updateBook = useCallback(async (id: string, data: Partial<BookFormData>) => {
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
  }, [dispatch]);

  const deleteBook = useCallback(async (id: string) => {
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
  }, [dispatch]);

  return {
    books,
    loading,
    error,
    loadBooks,
    addBook,
    updateBook,
    deleteBook,
  };
};