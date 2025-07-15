import React, { useState, useMemo, useCallback } from 'react';
import { Plus, BookOpen, RotateCcw, AlertCircle } from 'lucide-react';
import { Transaction } from '../../types';
import IssueBookForm from './IssueBookForm';
import Modal from '../common/Modal';
import SearchFilter from '../common/SearchFilter';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { useTransactions } from '../../hooks/useTransactions';
import { useBooks } from '../../hooks/useBooks';
import { useMembers } from '../../hooks/useMembers';
import { formatDate } from '../../utils/dateUtils';
import { useDebounce } from '../../hooks/useDebounce';

const TransactionList: React.FC = () => {
  const { transactions, loading, error, issueBook, returnBook, loadTransactions } = useTransactions();
  const { books, loading: booksLoading } = useBooks();
  const { members, loading: membersLoading } = useMembers();
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Debounce search term to optimize performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const statusOptions = [
    { value: 'issued', label: 'Issued' },
    { value: 'returned', label: 'Returned' },
    { value: 'overdue', label: 'Overdue' },
  ];

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const matchesSearch = transaction.bookTitle.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                          transaction.memberName.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchesStatus = !selectedStatus || transaction.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [transactions, debouncedSearchTerm, selectedStatus]);

  const handleOpenIssueModal = useCallback(() => {
    setIsIssueModalOpen(true);
  }, []);

  const handleCloseIssueModal = useCallback(() => {
    setIsIssueModalOpen(false);
    setIsSubmitting(false);
  }, []);

  const handleIssueBook = useCallback(async (bookId: string, memberId: string) => {
    try {
      setIsSubmitting(true);
      await issueBook(bookId, memberId);
      handleCloseIssueModal();
    } catch (error) {
      console.error('Error issuing book:', error);
      setIsSubmitting(false);
      // Keep modal open on error so user can retry
    }
  }, [issueBook, handleCloseIssueModal]);

  const handleReturnBook = useCallback(async (transactionId: string) => {
    if (window.confirm('Are you sure you want to return this book?')) {
      try {
        await returnBook(transactionId);
      } catch (error) {
        console.error('Error returning book:', error);
      }
    }
  }, [returnBook]);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'issued':
        return 'bg-blue-100 text-blue-800';
      case 'returned':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }, []);

  const getStatusIcon = useCallback((status: string) => {
    switch (status) {
      case 'issued':
        return <BookOpen className="h-4 w-4" />;
      case 'returned':
        return <RotateCcw className="h-4 w-4" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadTransactions} />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Transaction Management</h1>
        <button
          onClick={handleOpenIssueModal}
          disabled={loading || booksLoading || membersLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>
            {(booksLoading || membersLoading) ? 'Loading...' : 'Issue Book'}
          </span>
        </button>
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterOptions={statusOptions}
        selectedFilter={selectedStatus}
        onFilterChange={setSelectedStatus}
        placeholder="Search transactions by book title or member name..."
      />

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book / Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Return Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fine
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{transaction.bookTitle}</div>
                      <div className="text-sm text-gray-500">{transaction.memberName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(transaction.issueDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(transaction.dueDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.returnDate ? formatDate(transaction.returnDate) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {getStatusIcon(transaction.status)}
                      <span className="ml-1">{transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.fine ? `$${transaction.fine.toFixed(2)}` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {transaction.status === 'issued' && (
                      <button
                        onClick={() => handleReturnBook(transaction.id)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        Return
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No transactions found matching your criteria.</p>
        </div>
      )}

      <Modal
        isOpen={isIssueModalOpen}
        onClose={handleCloseIssueModal}
        title="Issue Book"
        size="lg"
      >
        {isIssueModalOpen && (
          <IssueBookForm
            books={books}
            members={members}
            onSubmit={handleIssueBook}
            onCancel={handleCloseIssueModal}
            isLoading={isSubmitting}
            booksLoading={booksLoading}
            membersLoading={membersLoading}
          />
        )}
      </Modal>
    </div>
  );
};

export default TransactionList;