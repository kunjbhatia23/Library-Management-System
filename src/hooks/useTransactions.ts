import { useEffect } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { transactionAPI } from '../services/api';

export const useTransactions = () => {
  const { state, dispatch } = useLibrary();

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      const transactions = await transactionAPI.getAll();
      dispatch({ type: 'SET_TRANSACTIONS', payload: transactions });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load transactions';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      console.error('Error loading transactions:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const issueBook = async (bookId: string, memberId: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      const transaction = await transactionAPI.issueBook(bookId, memberId);
      // Refresh the entire list to avoid duplicates and ensure book availability is updated
      await loadTransactions();
      return transaction;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to issue book';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      console.error('Error issuing book:', error);
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const returnBook = async (transactionId: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      const transaction = await transactionAPI.returnBook(transactionId);
      // Refresh the entire list to ensure consistency
      await loadTransactions();
      return transaction;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to return book';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      console.error('Error returning book:', error);
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return {
    transactions: state.transactions,
    loading: state.loading,
    error: state.error,
    loadTransactions,
    issueBook,
    returnBook,
  };
};