import { useEffect } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { memberAPI } from '../services/api';
import { MemberFormData } from '../types';

export const useMembers = () => {
  const { state, dispatch } = useLibrary();

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
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
  };

  const addMember = async (data: MemberFormData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      const newMember = await memberAPI.create(data);
      // Refresh the entire list to avoid duplicates
      await loadMembers();
      return newMember;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add member';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      console.error('Error adding member:', error);
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateMember = async (id: string, data: Partial<MemberFormData>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      const updatedMember = await memberAPI.update(id, data);
      // Refresh the entire list to ensure consistency
      await loadMembers();
      return updatedMember;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update member';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      console.error('Error updating member:', error);
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteMember = async (id: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      await memberAPI.delete(id);
      // Refresh the entire list to ensure consistency
      await loadMembers();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete member';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      console.error('Error deleting member:', error);
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return {
    members: state.members,
    loading: state.loading,
    error: state.error,
    loadMembers,
    addMember,
    updateMember,
    deleteMember,
  };
};