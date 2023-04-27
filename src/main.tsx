import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import HomePage from './pages/HomePage';
import { StarshipProvider } from './context/StarshipContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);

const root = document.getElementById('root');
if (root)
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <StarshipProvider>
        <RouterProvider router={router} />
      </StarshipProvider>
    </React.StrictMode>
  );
