import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';

export const Layout = () => {
  return (
    <>
      <Header open={open}></Header>
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};
