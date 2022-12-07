import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';
import { Header } from './Header/Header';
import { useAuthUser } from '@/hooks';
import { useEffect, useState } from 'react';
import { LocalStorageService } from '@/services/localStorage';
import { ToastContainer } from 'react-toastify';

export const Layout = () => {
  const userData = useAuthUser();
  const user = userData.data;

  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user || user === '') {
      if (user) {
        setAuthUser(user);
      }
      setIsLoading(false);
    }
  }, [user]);
  return (
    <>
      {LocalStorageService.getToken() ? (
        <Header userInfo={{ authUser, isLoading }} />
      ) : (
        <Header userInfo={{ authUser: null, isLoading: false }} />
      )}
      <main className="main">
        <Outlet context={{ authUser, isLoading }} />
      </main>
      <Footer />
    </>
  );
};
