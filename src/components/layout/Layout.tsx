import { Outlet } from 'react-router-dom';

import { useAuthUser } from '@/hooks/useAuthUser';

import { Header } from './Header';

export const Layout = () => {
  useAuthUser();

  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};
