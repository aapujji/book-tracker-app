import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root.jsx';
import Dashboard from './ui/Dashboard.jsx';
import BookList from './ui/BookList.jsx';
import BookPage from './ui/Book.jsx';
import EditBook from './ui/EditBook.jsx';
import './scss/main.scss';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/books',
        element: <BookList />
      },
      {
        path: '/books/:id',
        element: <BookPage />
      },
      {
        path: '/books/edit/:id',
        element: <EditBook />
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
