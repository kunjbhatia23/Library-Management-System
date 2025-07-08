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
      const members = await memberAPI.getAll();
      dispatch({ type: 'SET_MEMBERS', payload: members });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load members' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addMember = async (data: MemberFormData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const newMember = await memberAPI.create(data);
      dispatch({ type: 'ADD_MEMBER', payload: newMember });
      return newMember;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add member' });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateMember = async (id: string, data: Partial<MemberFormData>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const updatedMember = await memberAPI.update(id, data);
      dispatch({ type: 'UPDATE_MEMBER', payload: updatedMember });
      return updatedMember;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update member' });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteMember = async (id: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await memberAPI.delete(id);
      dispatch({ type: 'DELETE_MEMBER', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete member' });
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