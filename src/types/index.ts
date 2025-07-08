export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  publishedDate: string;
  totalCopies: number;
  availableCopies: number;
  description?: string;
  coverUrl?: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  membershipDate: string;
  isActive: boolean;
  membershipType: 'standard' | 'premium' | 'student';
}

export interface Transaction {
  id: string;
  bookId: string;
  memberId: string;
  bookTitle: string;
  memberName: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'issued' | 'returned' | 'overdue';
  fine?: number;
}

export interface BookFormData {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  publishedDate: string;
  totalCopies: number;
  description?: string;
}

export interface MemberFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  membershipType: 'standard' | 'premium' | 'student';
}