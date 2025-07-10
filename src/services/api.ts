import { Book, Member, Transaction, BookFormData, MemberFormData } from '../types';
import axios from 'axios';

// Create axios instance with base URL from environment
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Mock data
const mockBooks: Book[] = [
  {
    id: '1',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    isbn: '978-0-06-112008-4',
    publishedDate: '1960-07-11',
    totalCopies: 5,
    availableCopies: 3,
    description: 'A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice.',
    coverUrl: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian Fiction',
    isbn: '978-0-452-28423-4',
    publishedDate: '1949-06-08',
    totalCopies: 4,
    availableCopies: 2,
    description: 'A dystopian social science fiction novel that explores the consequences of totalitarianism and mass surveillance.',
    coverUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    isbn: '978-0-14-143951-8',
    publishedDate: '1813-01-28',
    totalCopies: 6,
    availableCopies: 4,
    description: 'A romantic novel that critiques the British landed gentry at the end of the 18th century.',
    coverUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    isbn: '978-0-7432-7356-5',
    publishedDate: '1925-04-10',
    totalCopies: 3,
    availableCopies: 1,
    description: 'A classic American novel set in the Jazz Age that explores themes of wealth, love, and the American Dream.',
    coverUrl: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

const mockMembers: Member[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1-555-0123',
    address: '123 Main St, City, State 12345',
    membershipDate: '2023-01-15',
    isActive: true,
    membershipType: 'standard'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+1-555-0456',
    address: '456 Oak Ave, City, State 12345',
    membershipDate: '2023-03-20',
    isActive: true,
    membershipType: 'premium'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@email.com',
    phone: '+1-555-0789',
    address: '789 Pine Rd, City, State 12345',
    membershipDate: '2023-06-10',
    isActive: false,
    membershipType: 'student'
  }
];

const mockTransactions: Transaction[] = [
  {
    id: '1',
    bookId: '1',
    memberId: '1',
    bookTitle: 'To Kill a Mockingbird',
    memberName: 'John Doe',
    issueDate: '2024-01-15',
    dueDate: '2024-01-29',
    status: 'issued'
  },
  {
    id: '2',
    bookId: '2',
    memberId: '2',
    bookTitle: '1984',
    memberName: 'Jane Smith',
    issueDate: '2024-01-10',
    dueDate: '2024-01-24',
    returnDate: '2024-01-22',
    status: 'returned'
  },
  {
    id: '3',
    bookId: '3',
    memberId: '1',
    bookTitle: 'Pride and Prejudice',
    memberName: 'John Doe',
    issueDate: '2024-01-01',
    dueDate: '2024-01-15',
    status: 'overdue',
    fine: 5.00
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Book API
export const bookAPI = {
  getAll: async (): Promise<Book[]> => {
    try {
      // Try to fetch from real API first
      const response = await api.get('/books');
      return response.data;
    } catch (error) {
      // Fallback to mock data if API is not available
      console.warn('API not available, using mock data');
      await delay(500);
      return mockBooks;
    }
  },
  
  getById: async (id: string): Promise<Book | null> => {
    try {
      const response = await api.get(`/books/${id}`);
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock data');
      await delay(300);
      return mockBooks.find(book => book.id === id) || null;
    }
  },
  
  create: async (data: BookFormData): Promise<Book> => {
    try {
      const response = await api.post('/books', data);
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock data');
      await delay(500);
      const newBook: Book = {
        id: Date.now().toString(),
        ...data,
        availableCopies: data.totalCopies,
        coverUrl: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400'
      };
      mockBooks.push(newBook);
      return newBook;
    }
  },
  
  update: async (id: string, data: Partial<BookFormData>): Promise<Book> => {
    try {
      const response = await api.put(`/books/${id}`, data);
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock data');
      await delay(500);
      const index = mockBooks.findIndex(book => book.id === id);
      if (index === -1) throw new Error('Book not found');
      
      mockBooks[index] = { ...mockBooks[index], ...data };
      return mockBooks[index];
    }
  },
  
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/books/${id}`);
    } catch (error) {
      console.warn('API not available, using mock data');
      await delay(500);
      const index = mockBooks.findIndex(book => book.id === id);
      if (index === -1) throw new Error('Book not found');
      
      mockBooks.splice(index, 1);
    }
  }
};

// Member API
export const memberAPI = {
  getAll: async (): Promise<Member[]> => {
    try {
      const response = await api.get('/members');
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock data');
      await delay(500);
      return mockMembers;
    }
  },
  
  getById: async (id: string): Promise<Member | null> => {
    try {
      const response = await api.get(`/members/${id}`);
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock data');
      await delay(300);
      return mockMembers.find(member => member.id === id) || null;
    }
  },
  
  create: async (data: MemberFormData): Promise<Member> => {
    try {
      const response = await api.post('/members', data);
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock data');
      await delay(500);
      const newMember: Member = {
        id: Date.now().toString(),
        ...data,
        membershipDate: new Date().toISOString().split('T')[0],
        isActive: true
      };
      mockMembers.push(newMember);
      return newMember;
    }
  },
  
  update: async (id: string, data: Partial<Member>): Promise<Member> => {
    try {
      const response = await api.put(`/members/${id}`, data);
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock data');
      await delay(500);
      const index = mockMembers.findIndex(member => member.id === id);
      if (index === -1) throw new Error('Member not found');
      
      mockMembers[index] = { ...mockMembers[index], ...data };
      return mockMembers[index];
    }
  },
  
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/members/${id}`);
    } catch (error) {
      console.warn('API not available, using mock data');
      await delay(500);
      const index = mockMembers.findIndex(member => member.id === id);
      if (index === -1) throw new Error('Member not found');
      
      mockMembers.splice(index, 1);
    }
  }
};

// Transaction API
export const transactionAPI = {
  getAll: async (): Promise<Transaction[]> => {
    try {
      const response = await api.get('/transactions');
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock data');
      await delay(500);
      return mockTransactions;
    }
  },
  
  issueBook: async (bookId: string, memberId: string): Promise<Transaction> => {
    try {
      const response = await api.post('/transactions/issue', { bookId, memberId });
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock data');
      await delay(500);
      const book = mockBooks.find(b => b.id === bookId);
      const member = mockMembers.find(m => m.id === memberId);
      
      if (!book || !member) throw new Error('Book or Member not found');
      if (book.availableCopies <= 0) throw new Error('No copies available');
      
      const transaction: Transaction = {
        id: Date.now().toString(),
        bookId,
        memberId,
        bookTitle: book.title,
        memberName: member.name,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'issued'
      };
      
      book.availableCopies--;
      mockTransactions.push(transaction);
      return transaction;
    }
  },
  
  returnBook: async (transactionId: string): Promise<Transaction> => {
    try {
      const response = await api.put(`/transactions/${transactionId}/return`);
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock data');
      await delay(500);
      const transaction = mockTransactions.find(t => t.id === transactionId);
      if (!transaction) throw new Error('Transaction not found');
      
      const book = mockBooks.find(b => b.id === transaction.bookId);
      if (book) book.availableCopies++;
      
      transaction.returnDate = new Date().toISOString().split('T')[0];
      transaction.status = 'returned';
      
      return transaction;
    }
  }
};