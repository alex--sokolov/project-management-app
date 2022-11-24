import { useUser } from '@/hooks';
import { useAuthUser } from '@/hooks/useAuthUser';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';

export const Layout = () => {
  useAuthUser();

  return (
    <>
      <Header></Header>
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};
