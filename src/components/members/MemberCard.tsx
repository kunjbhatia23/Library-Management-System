import React from 'react';
import { Member } from '../../types';
import { Edit, Trash2, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

interface MemberCardProps {
  member: Member;
  onEdit: (member: Member) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onEdit, onDelete, onToggleStatus }) => {
  const membershipTypeColors = {
    standard: 'bg-blue-100 text-blue-800',
    premium: 'bg-purple-100 text-purple-800',
    student: 'bg-green-100 text-green-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {member.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${membershipTypeColors[member.membershipType]}`}>
              {member.membershipType.charAt(0).toUpperCase() + member.membershipType.slice(1)}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onToggleStatus(member.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              member.isActive
                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                : 'bg-red-100 text-red-800 hover:bg-red-200'
            }`}
          >
            {member.isActive ? 'Active' : 'Inactive'}
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="h-4 w-4 mr-2" />
          <span>{member.email}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="h-4 w-4 mr-2" />
          <span>{member.phone}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="line-clamp-1">{member.address}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Member since {formatDate(member.membershipDate)}</span>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={() => onEdit(member)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Edit member"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(member.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete member"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default MemberCard;