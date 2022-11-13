import { FC, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './components/pages/Home/Home';
import { Profile } from './components/pages/Profile/Profile';
import { Boards } from './components/pages/Boards/Boards';
import { Board } from './components/pages/Board/Board';
import { NotFound } from './components/pages/NotFound/NotFound';
import PrivateRoutes from './utils/PrivateRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const App: FC = () => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 20,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/boards" element={<Boards />} />
            <Route path="/board" element={<Board />} />
          </Route>
          <Route path="/404" element={<NotFound />} />
          <Route path="/*" element={<Navigate to="/404" />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
