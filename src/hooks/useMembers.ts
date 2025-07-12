import { useEffect, useCallback, useMemo } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { memberAPI } from '../services/api';
import { MemberFormData } from '../types';

export const useMembers = () => {
  const { state, dispatch } = useLibrary();

  // Memoize members to prevent unnecessary re-renders
  const members = useMemo(() => state.members, [state.members]);
  const loading = useMemo(() => state.loading, [state.loading]);
  const error = useMemo(() => state.error, [state.error]);

  // Memoize loadMembers function to prevent unnecessary re-renders
  const loadMembers = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      const members = await memberAPI.getAll();
      dispatch({ type: 'SET_MEMBERS', payload: members });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load members';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      console.error('Error loading members:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [dispatch]);

  useEffect(() => {
    // Only load if members array is empty to prevent unnecessary API calls
    if (members.length === 0 && !loading && !error) {
      loadMembers();
    }
  }, [members.length, loading, error, loadMembers]);

  useEffect(() => {
    loadMembers();
  }, []);


  const addMember = useCallback(async (data: MemberFormData) => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null });
      const newMember = await memberAPI.create(data);
      // Add the new member to the existing list
      dispatch({ type: 'ADD_MEMBER', payload: newMember });
      return newMember;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add member';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      console.error('Error adding member:', error);
      throw error;
    }
  }, [dispatch]);

  const updateMember = useCallback(async (id: string, data: Partial<MemberFormData>) => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null });
      const updatedMember = await memberAPI.update(id, data);
      // Update the member in the existing list
      dispatch({ type: 'UPDATE_MEMBER', payload: updatedMember });
      return updatedMember;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update member';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      console.error('Error updating member:', error);
      throw error;
    }
  }, [dispatch]);

  const deleteMember = useCallback(async (id: string) => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null });
      await memberAPI.delete(id);
      // Remove the member from the existing list
      dispatch({ type: 'DELETE_MEMBER', payload: id });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete member';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      console.error('Error deleting member:', error);
      throw error;
    }
  }, [dispatch]);

  return {
    members,
    loading,
    error,
    loadMembers,
    addMember,
    updateMember,
    deleteMember,
  };
};