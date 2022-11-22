import { FC, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '@/components/pages/Home/Home';
import { Profile } from '@/components/pages/Profile/Profile';
import { Boards } from '@/components/pages/Boards/Boards';
import { Board } from '@/components/pages/Board/Board';
import { NotFound } from '@/components/pages/NotFound/NotFound';
import PrivateRoutes from '@/utils/PrivateRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Authorization } from './components/pages/Authorization/Authorization';
import { Auth } from './types';
import { Layout } from './components/Layout';

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
        // logger: {
        //   log: console.log,
        //   warn: console.warn,
        //   error: () => {},
        // },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route element={<PrivateRoutes />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/boards" element={<Boards />} />
              <Route path="/board" element={<Board />} />
            </Route>
            <Route path="auth/signin" element={<Authorization formType={Auth.Login} />} />
            <Route path="auth/signup" element={<Authorization formType={Auth.Register} />} />
            <Route path="auth/signout" element={<Authorization formType={Auth.Logout} />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/*" element={<Navigate to="/404" />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
