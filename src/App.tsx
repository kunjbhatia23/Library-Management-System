import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LibraryProvider } from './context/LibraryContext';
import Layout from './components/common/Layout';
import Dashboard from './components/dashboard/Dashboard';
import BookList from './components/books/BookList';
import MemberList from './components/members/MemberList';
import TransactionList from './components/transactions/TransactionList';

function App() {
  return (
    <LibraryProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="books" element={<BookList />} />
            <Route path="members" element={<MemberList />} />
            <Route path="transactions" element={<TransactionList />} />
          </Route>
        </Routes>
      </Router>
    </LibraryProvider>
  );
}

export default App;