import { Outlet } from 'react-router-dom';

import { useAuthUser } from '@/hooks/useAuthUser';
import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';
import Header from './Header/Header';

export const Layout = () => {
  useAuthUser();

  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer></Footer>
    </>
  );
};
