import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './components/pages/Home/Home';
import { Profile } from './components/pages/Profile/Profile';
import { Boards } from './components/pages/Boards/Boards';
import { Board } from './components/pages/Board/Board';
import { NotFound } from './components/pages/NotFound/NotFound';
import PrivateRoutes from './utils/PrivateRoutes';

export const App: FC = () => {
  return (
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
  );
};
