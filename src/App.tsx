import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UsersPage from './pages/UsersPage';
import EditUserPage from './pages/EditUserPage';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="/users/:id" element={<EditUserPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
