import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Member } from '../../types';
import MemberCard from './MemberCard';
import MemberForm from './MemberForm';
import Modal from '../common/Modal';
import SearchFilter from '../common/SearchFilter';
import LoadingSpinner from '../common/LoadingSpinner';
import { useMembers } from '../../hooks/useMembers';

const MemberList: React.FC = () => {
  const { members, loading, addMember, updateMember, deleteMember } = useMembers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMembershipType, setSelectedMembershipType] = useState('');

  const membershipTypes = [
    { value: 'standard', label: 'Standard' },
    { value: 'premium', label: 'Premium' },
    { value: 'student', label: 'Student' },
  ];

  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.phone.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !selectedMembershipType || member.membershipType === selectedMembershipType;
      return matchesSearch && matchesType;
    });
  }, [members, searchTerm, selectedMembershipType]);

  const handleAddMember = () => {
    setEditingMember(null);
    setIsModalOpen(true);
  };

  const handleEditMember = (member: Member) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (data: any) => {
    try {
      if (editingMember) {
        await updateMember(editingMember.id, data);
      } else {
        await addMember(data);
      }
      setIsModalOpen(false);
      setEditingMember(null);
    } catch (error) {
      console.error('Error saving member:', error);
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await deleteMember(id);
      } catch (error) {
        console.error('Error deleting member:', error);
      }
    }
  };

  const handleToggleStatus = async (id: string) => {
    const member = members.find(m => m.id === id);
    if (member) {
      try {
        await updateMember(id, { isActive: !member.isActive });
      } catch (error) {
        console.error('Error updating member status:', error);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Member Management</h1>
        <button
          onClick={handleAddMember}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Member</span>
        </button>
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterOptions={membershipTypes}
        selectedFilter={selectedMembershipType}
        onFilterChange={setSelectedMembershipType}
        placeholder="Search members by name, email, or phone..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            onEdit={handleEditMember}
            onDelete={handleDeleteMember}
            onToggleStatus={handleToggleStatus}
          />
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No members found matching your criteria.</p>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingMember ? 'Edit Member' : 'Add New Member'}
        size="lg"
      >
        <MemberForm
          member={editingMember || undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
          isLoading={loading}
        />
      </Modal>
    </div>
  );
};

export default MemberList;