import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { AuthProvider } from "./context/AuthContext";
import { ToggleProvider } from './context/ToggleContext';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      // refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
      <AuthProvider>
        <ToggleProvider>
          <App />
          <ReactQueryDevtools />
        </ToggleProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
