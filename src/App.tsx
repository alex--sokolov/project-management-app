import { FC, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Layout } from './components/layout';
import { Home } from '@/components/pages/Home/Home';
import { Profile } from '@/components/pages/Profile/Profile';
import { Boards } from '@/components/pages/Boards/Boards';
import { BoardComponent } from '@/components/pages/Board/Board';
import { NotFound } from '@/components/pages/NotFound/NotFound';
import { PrivateRoutes, PrivateRegisterRoutes } from '@/components/shared/PrivateRoutes';
import { Authorization } from './components/pages/Authorization/Authorization';
import { TestAuthProfile } from '@/components/pages/TestComponents/TestAuthProfile';
import { TestModalToasts } from '@/components/pages/TestComponents/TestModalToasts';
import { TestBoards } from './components/pages/TestComponents/TestBoards';
import { TestColumns } from './components/pages/TestComponents/TestColumns';
import { TestTasks } from '@/components/pages/TestComponents/TestTasks';
import { TestPoints } from '@/components/pages/TestComponents/TestPoints';
import { TestFiles } from '@/components/pages/TestComponents/TestFiles';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Auth } from './types';
import { ToastContainer } from 'react-toastify';

export const App: FC = () => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
            staleTime: 1000 * 20,
          },
        },
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
              <Route path="/">
                <Route index element={<Boards />} />
                <Route path="/boards/:id" element={<BoardComponent />} />
              </Route>
            </Route>
            <Route element={<PrivateRegisterRoutes />}>
              <Route path="/auth/signin" element={<Authorization formType={Auth.Login} />} />
              <Route path="/auth/signup" element={<Authorization formType={Auth.Register} />} />
              <Route path="/auth/signout" element={<Authorization formType={Auth.Logout} />} />
            </Route>
            {/* Test components start */}
            <Route path="auth/test" element={<TestAuthProfile />} />
            <Route path="profile/test" element={<TestAuthProfile />} />
            <Route path="modal" element={<TestModalToasts />} />
            <Route path="toasts" element={<TestModalToasts />} />
            <Route path="boards/test" element={<TestBoards />} />
            <Route path="columns/test" element={<TestColumns />} />
            <Route path="tasks/test" element={<TestTasks />} />
            <Route path="points/test" element={<TestPoints />} />
            <Route path="files/test" element={<TestFiles />} />
            {/* Test components end */}
            <Route path="/404" element={<NotFound />} />
            <Route path="/*" element={<Navigate to="/404" />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
