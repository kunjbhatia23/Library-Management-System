import { useEffect, useCallback, useMemo } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { transactionAPI } from '../services/api';

export const useTransactions = () => {
  const { state, dispatch } = useLibrary();

  // Memoize transactions to prevent unnecessary re-renders
  const transactions = useMemo(() => state.transactions, [state.transactions]);
  const loading = useMemo(() => state.loading, [state.loading]);
  const error = useMemo(() => state.error, [state.error]);

  // Memoize loadTransactions function to prevent unnecessary re-renders
  const loadTransactions = useCallback(async () => {
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
  }, [dispatch]);

  useEffect(() => {
    // Only load if transactions array is empty to prevent unnecessary API calls
    if (transactions.length === 0 && !loading && !error) {
      loadTransactions();
    }
  }, [transactions.length, loading, error, loadTransactions]);

  useEffect(() => {
    loadTransactions();
  }, []);


  const issueBook = useCallback(async (bookId: string, memberId: string) => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null });
      const transaction = await transactionAPI.issueBook(bookId, memberId);
      // Add the new transaction to the existing list
      dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
      return transaction;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to issue book';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      console.error('Error issuing book:', error);
      throw error;
    }
  }, [dispatch]);

  const returnBook = useCallback(async (transactionId: string) => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null });
      const transaction = await transactionAPI.returnBook(transactionId);
      // Update the transaction in the existing list
      dispatch({ type: 'UPDATE_TRANSACTION', payload: transaction });
      return transaction;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to return book';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      console.error('Error returning book:', error);
      throw error;
    }
  }, [dispatch]);

  return {
    transactions,
    loading,
    error,
    loadTransactions,
    issueBook,
    returnBook,
  };
};