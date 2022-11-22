import { useAuthUser } from '@/hooks/useAuthUser';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header/Header';

export const Layout = () => {
  useAuthUser();
  //   const navigate = useNavigate();
  //   const queryClient = useQueryClient();
  //   const authUser = queryClient.getQueryData(['authUser']);
  //   const [isAuthorized, setIsAuthorized] = useState(authUser);
  //   useEffect(() => {
  //     console.log(authUser);
  //     console.log(isAuthorized);

  //     if (authUser !== isAuthorized) {
  //       setIsAuthorized(authUser);
  //       navigate('/');
  //     }
  //   }, [authUser, navigate, isAuthorized]);
  console.log('aaa');

  return (
    <>
      <Header></Header>
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};
