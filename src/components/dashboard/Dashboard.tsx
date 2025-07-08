import React from 'react';
import { BookOpen, Users, ArrowLeftRight, TrendingUp } from 'lucide-react';
import { useBooks } from '../../hooks/useBooks';
import { useMembers } from '../../hooks/useMembers';
import { useTransactions } from '../../hooks/useTransactions';
import LoadingSpinner from '../common/LoadingSpinner';

const Dashboard: React.FC = () => {
  const { books } = useBooks();
  const { members } = useMembers();
  const { transactions } = useTransactions();

  const totalBooks = books.length;
  const totalMembers = members.length;
  const activeMembers = members.filter(member => member.isActive).length;
  const totalTransactions = transactions.length;
  const issuedBooks = transactions.filter(transaction => transaction.status === 'issued').length;
  const overdueBooks = transactions.filter(transaction => transaction.status === 'overdue').length;

  const stats = [
    {
      title: 'Total Books',
      value: totalBooks,
      icon: BookOpen,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Active Members',
      value: activeMembers,
      icon: Users,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Books Issued',
      value: issuedBooks,
      icon: ArrowLeftRight,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Overdue Books',
      value: overdueBooks,
      icon: TrendingUp,
      color: 'bg-red-500',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  const recentTransactions = transactions
    .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime())
    .slice(0, 5);

  const popularBooks = books
    .sort((a, b) => (b.totalCopies - b.availableCopies) - (a.totalCopies - a.availableCopies))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Welcome to Library Management System
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-800">{transaction.bookTitle}</p>
                  <p className="text-xs text-gray-600">{transaction.memberName}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{new Date(transaction.issueDate).toLocaleDateString()}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                    transaction.status === 'issued' ? 'bg-blue-100 text-blue-800' :
                    transaction.status === 'returned' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Books */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Popular Books</h2>
          <div className="space-y-3">
            {popularBooks.map((book) => (
              <div key={book.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-800">{book.title}</p>
                  <p className="text-xs text-gray-600">by {book.author}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{book.genre}</p>
                  <p className="text-xs text-blue-600 font-medium">
                    {book.totalCopies - book.availableCopies} issued
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/books"
            className="flex items-center justify-center p-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Manage Books
          </a>
          <a
            href="/members"
            className="flex items-center justify-center p-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Users className="h-5 w-5 mr-2" />
            Manage Members
          </a>
          <a
            href="/transactions"
            className="flex items-center justify-center p-4 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <ArrowLeftRight className="h-5 w-5 mr-2" />
            View Transactions
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;