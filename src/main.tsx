import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import { StarshipProvider } from './context/StarshipContext';
import PageContainer from './components/PageContainer';

import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageContainer />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/starship/:id', element: <DetailsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
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
