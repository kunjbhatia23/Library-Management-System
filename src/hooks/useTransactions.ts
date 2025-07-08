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
      const transactions = await transactionAPI.getAll();
      dispatch({ type: 'SET_TRANSACTIONS', payload: transactions });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load transactions' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const issueBook = async (bookId: string, memberId: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const transaction = await transactionAPI.issueBook(bookId, memberId);
      dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
      return transaction;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to issue book' });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const returnBook = async (transactionId: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const transaction = await transactionAPI.returnBook(transactionId);
      dispatch({ type: 'UPDATE_TRANSACTION', payload: transaction });
      return transaction;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to return book' });
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