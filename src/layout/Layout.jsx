import React from 'react';

import { Route, Routes } from 'react-router-dom';
import CreatePage from '../pages/CreatePage';
import DisplayPage from '../pages/DisplayPage';

const Layout = () => {

  return (
      <Routes>
        <Route path="/create" element={<CreatePage />} />
        <Route path="/" element={<DisplayPage />} />
      </Routes>
  );
};

export default Layout;
