import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Member, MemberFormData } from '../../types';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  address: yup.string().required('Address is required'),
  membershipType: yup.string().oneOf(['standard', 'premium', 'student']).required('Membership type is required'),
});

interface MemberFormProps {
  member?: Member;
  onSubmit: (data: MemberFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const MemberForm: React.FC<MemberFormProps> = ({ member, onSubmit, onCancel, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberFormData>({
    resolver: yupResolver(schema),
    defaultValues: member ? {
      name: member.name,
      email: member.email,
      phone: member.phone,
      address: member.address,
      membershipType: member.membershipType,
    } : {
      membershipType: 'standard',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name *
        </label>
        <input
          id="name"
          {...register('name')}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="Enter full name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address *
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="Enter email address"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number *
        </label>
        <input
          id="phone"
          type="tel"
          {...register('phone')}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="Enter phone number"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Address *
        </label>
        <textarea
          id="address"
          {...register('address')}
          rows={3}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="Enter full address"
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
      </div>

      <div>
        <label htmlFor="membershipType" className="block text-sm font-medium text-gray-700 mb-1">
          Membership Type *
        </label>
        <select
          id="membershipType"
          {...register('membershipType')}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.membershipType ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
        >
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
          <option value="student">Student</option>
        </select>
        {errors.membershipType && <p className="text-red-500 text-sm mt-1">{errors.membershipType.message}</p>}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Saving...' : member ? 'Update Member' : 'Add Member'}
        </button>
      </div>
    </form>
  );
};

export default MemberForm;