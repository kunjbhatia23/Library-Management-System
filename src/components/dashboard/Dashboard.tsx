import React from 'react';
import { BookOpen, Users, ArrowLeftRight, TrendingUp, Calendar, AlertTriangle } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { useBooks } from '../../hooks/useBooks';
import { useMembers } from '../../hooks/useMembers';
import { useTransactions } from '../../hooks/useTransactions';
import LoadingSpinner from '../common/LoadingSpinner';
import CounterCard from './CounterCard';
import BookStatusChart from './BookStatusChart';
import WeeklyIssuesChart from './WeeklyIssuesChart';
import { formatDate } from '../../utils/dateUtils';

const Dashboard: React.FC = () => {
  const { loading } = useLibrary();
  const { books } = useBooks();
  const { members } = useMembers();
  const { transactions } = useTransactions();

  const totalBooks = books.length;
  const totalMembers = members.length;
  const activeMembers = members.filter(member => member.isActive).length;
  const totalTransactions = transactions.length;
  const issuedBooks = transactions.filter(transaction => transaction.status === 'issued').length;
  const overdueBooks = transactions.filter(transaction => transaction.status === 'overdue').length;

  // Mock data for today's issues
  const booksIssuedToday = 12;

  const recentTransactions = transactions
    .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime())
    .slice(0, 5);

  const popularBooks = books
    .sort((a, b) => (b.totalCopies - b.availableCopies) - (a.totalCopies - a.availableCopies))
    .slice(0, 5);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome to Library Management System</p>
        </div>
        <div className="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CounterCard
          title="Total Books"
          value={totalBooks}
          icon={<BookOpen className="w-8 h-8" />}
          color="blue"
          trend={{ value: 8.2, isPositive: true }}
        />
        <CounterCard
          title="Books Issued Today"
          value={booksIssuedToday}
          icon={<Calendar className="w-8 h-8" />}
          color="green"
          trend={{ value: 12.5, isPositive: true }}
        />
        <CounterCard
          title="Active Members"
          value={activeMembers}
          icon={<Users className="w-8 h-8" />}
          color="purple"
          trend={{ value: 3.1, isPositive: true }}
        />
        <CounterCard
          title="Overdue Returns"
          value={overdueBooks}
          icon={<AlertTriangle className="w-8 h-8" />}
          color="red"
          trend={{ value: 2.4, isPositive: false }}
        />
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <BookStatusChart />
        <WeeklyIssuesChart />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="p-6 border-b border-gray-50">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
              <a href="/transactions" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
              </a>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-800">{transaction.bookTitle}</p>
                  <p className="text-xs text-gray-600 mt-1">{transaction.memberName}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">{formatDate(transaction.issueDate)}</p>
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="p-6 border-b border-gray-50">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Popular Books</h2>
              <a href="/books" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
              </a>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {popularBooks.map((book) => (
              <div key={book.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-800">{book.title}</p>
                  <p className="text-xs text-gray-600 mt-1">by {book.author}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">{book.genre}</p>
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
        <div className="p-6 border-b border-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/books"
            className="flex items-center justify-center p-6 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all duration-200 hover:scale-105 group"
          >
            <BookOpen className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Manage Books</span>
          </a>
          <a
            href="/members"
            className="flex items-center justify-center p-6 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-all duration-200 hover:scale-105 group"
          >
            <Users className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Manage Members</span>
          </a>
          <a
            href="/transactions"
            className="flex items-center justify-center p-6 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-all duration-200 hover:scale-105 group"
          >
            <ArrowLeftRight className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
            <span className="font-medium">View Transactions</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;