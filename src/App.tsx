import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LibraryProvider } from './context/LibraryContext';
import Layout from './components/common/Layout';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy load components for better performance
const Dashboard = React.lazy(() => import('./components/dashboard/Dashboard'));
const BookList = React.lazy(() => import('./components/books/BookList'));
const MemberList = React.lazy(() => import('./components/members/MemberList'));
const TransactionList = React.lazy(() => import('./components/transactions/TransactionList'));

function App() {
  return (
    <LibraryProvider>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="books" element={<BookList />} />
              <Route path="members" element={<MemberList />} />
              <Route path="transactions" element={<TransactionList />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </LibraryProvider>
  );
}

export default App;