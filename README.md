# Library Management System

A modern, responsive Library Management System built with React, TypeScript, and Tailwind CSS. This application provides a comprehensive solution for managing books, members, and transactions in a library setting.

## Features

### 📚 Book Management
- Add, edit, and delete books
- Search and filter books by title, author, genre, or ISBN
- View book details including availability status
- Track total and available copies
- Upload book covers (placeholder implementation)

### 👥 Member Management
- Register new members with detailed information
- Edit member profiles and manage membership types
- Toggle member status (active/inactive)
- Search members by name, email, or phone
- Track membership dates and types (Standard, Premium, Student)

### 🔄 Transaction Management
- Issue books to members with automatic due date calculation
- Return books with status tracking
- View transaction history with filtering capabilities
- Handle overdue books and fine calculations
- Real-time availability updates

### 📊 Dashboard
- Overview statistics (total books, active members, issued books, overdue books)
- Recent transaction activity
- Popular books tracking
- Quick action buttons for common tasks

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: Context API with useReducer
- **Form Handling**: React Hook Form with Yup validation
- **HTTP Client**: Axios (configured for mock API)
- **Icons**: Lucide React
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   ├── books/           # Book management components
│   ├── members/         # Member management components
│   ├── transactions/    # Transaction management components
│   └── dashboard/       # Dashboard components
├── context/             # React Context for state management
├── hooks/              # Custom React hooks
├── services/           # API service layer (mock implementation)
├── types/              # TypeScript type definitions
└── App.tsx             # Main application component
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd library-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your API configuration:
   ```
   VITE_API_BASE_URL=http://localhost:3001/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## API Integration

The application is designed to work with a REST API but includes mock data for demonstration purposes. The API endpoints expected are:

- `GET /api/books` - Fetch all books
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book
- `GET /api/members` - Fetch all members
- `POST /api/members` - Create a new member
- `PUT /api/members/:id` - Update a member
- `DELETE /api/members/:id` - Delete a member
- `GET /api/transactions` - Fetch all transactions
- `POST /api/transactions/issue` - Issue a book
- `PUT /api/transactions/:id/return` - Return a book

## Features in Detail

### Responsive Design
- Mobile-first approach with breakpoints for tablet and desktop
- Adaptive layouts that work seamlessly across all device sizes
- Touch-friendly interface for mobile devices

### Form Validation
- Real-time validation using React Hook Form and Yup
- User-friendly error messages
- Prevention of invalid data submission

### Search & Filtering
- Real-time search across multiple fields
- Category-based filtering
- Combination of search and filter capabilities

### State Management
- Centralized state using Context API
- Optimistic updates for better UX
- Error handling and loading states

### User Experience
- Smooth animations and transitions
- Loading indicators
- Confirmation dialogs for destructive actions
- Responsive modals and forms
